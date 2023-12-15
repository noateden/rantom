import BigNumber from 'bignumber.js';

import { AddressZero } from '../../../configs/constants/addresses';
import { compareAddress, formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferAbiMappings, TransferEventSignatures } from '../transfer/abis';
import { YearnAbiMappings, YearnEventSignatures } from './abis';

const YearnVaultAbi = [
  {
    stateMutability: 'view',
    type: 'function',
    name: 'pricePerShare',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
];

export default class YearnAdapter extends Adapter {
  public readonly name: string = 'adapter.yearn';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = {
      ...TransferAbiMappings,
      ...YearnAbiMappings,
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];

    const web3 = this.services.blockchain.getProvider(options.chain);

    if (signature === TransferEventSignatures.Transfer && options.log.topics.length === 3) {
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const stakingPool = await this.services.datastore.getStakingPoolConstant({
        chain: options.chain,
        protocol: this.config.protocol,
        address: normalizeAddress(options.log.address),
      });

      if (stakingPool) {
        if (compareAddress(event.from, AddressZero) || compareAddress(event.to, AddressZero)) {
          try {
            const pricePerShare = await this.services.blockchain.singlecall({
              chain: options.chain,
              abi: YearnVaultAbi,
              target: options.log.address,
              method: 'pricePerShare',
              params: [],
            });
            const shareAmount = new BigNumber(event.value.toString())
              .multipliedBy(pricePerShare.toString())
              .dividedBy(1e18)
              .toString(10);
            const amount = formatFromDecimals(shareAmount, stakingPool.token.decimals);
            const user = normalizeAddress(compareAddress(event.from, AddressZero) ? event.to : event.from);
            const action: KnownAction = compareAddress(event.from, AddressZero) ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [stakingPool.token],
                tokenAmounts: [amount],
              })
            );
          } catch (e: any) {}
        }
      }
    } else if (signature === YearnEventSignatures.veYFIWithdraw || signature === YearnEventSignatures.veYFIModifyLock) {
      if (this.supportedContract(options.chain, options.log.address)) {
        const event = web3.eth.abi.decodeLog(
          this.eventMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );

        const stakingPool = await this.services.datastore.getStakingPoolConstant({
          chain: options.chain,
          protocol: this.config.protocol,
          address: options.log.address,
        });
        if (stakingPool) {
          const provider = normalizeAddress(event.user);
          const amount = formatFromDecimals(event.amount.toString(), stakingPool.token.decimals);
          const action: KnownAction = signature === YearnEventSignatures.veYFIModifyLock ? 'lock' : 'unlock';

          const buildAction = this.buildUpAction({
            ...options,
            action: action,
            addresses: [provider],
            tokens: [stakingPool.token],
            tokenAmounts: [amount],
          });

          actions.push({
            ...buildAction,
            addition: {
              unlockTime: event.locktime ? Number(event.locktime) : 0,
            },
          });
        }
      }
    }

    return actions;
  }
}
