import { AddressZero } from '../../../configs/constants/addresses';
import EnvConfig from '../../../configs/envConfig';
import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { BasebridgeAbiMappings, BasebridgeEventSignatures } from './abis';

export default class BasebridgeAdapter extends Adapter {
  public readonly name: string = 'adapter.basebridge';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = BasebridgeAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);

    if (this.supportedContract(options.chain, options.log.address)) {
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case BasebridgeEventSignatures.ETHDepositInitiated:
        case BasebridgeEventSignatures.ETHWithdrawalFinalized: {
          const token: Token = {
            chain: 'ethereum',
            symbol: 'ETH',
            decimals: 18,
            address: AddressZero,
          };
          const amount = formatFromDecimals(event.amount.toString(), token.decimals);
          const from = normalizeAddress(event.from);
          const to = normalizeAddress(event.to);

          const buildAction = this.buildUpAction({
            ...options,
            action: 'bridge',
            addresses: [from, to],
            tokens: [token],
            tokenAmounts: [amount],
          });

          if (signature === BasebridgeEventSignatures.ERC20DepositInitiated) {
            buildAction.addition = {
              fromChain: EnvConfig.blockchains.ethereum.chainId.toString(),
              toChain: EnvConfig.blockchains.base.chainId.toString(),
            };
          } else {
            buildAction.addition = {
              fromChain: EnvConfig.blockchains.base.chainId.toString(),
              toChain: EnvConfig.blockchains.ethereum.chainId.toString(),
            };
          }

          actions.push(buildAction);

          break;
        }
        case BasebridgeEventSignatures.ERC20DepositInitiated:
        case BasebridgeEventSignatures.ERC20WithdrawalFinalized: {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event.l1Token,
          });

          if (token) {
            const amount = formatFromDecimals(event.amount.toString(), token.decimals);
            const from = normalizeAddress(event.from);
            const to = normalizeAddress(event.to);

            const buildAction = this.buildUpAction({
              ...options,
              action: 'bridge',
              addresses: [from, to],
              tokens: [token],
              tokenAmounts: [amount],
            });

            if (signature === BasebridgeEventSignatures.ERC20DepositInitiated) {
              buildAction.addition = {
                fromChain: EnvConfig.blockchains.ethereum.chainId.toString(),
                toChain: EnvConfig.blockchains.base.chainId.toString(),
              };
            } else {
              buildAction.addition = {
                fromChain: EnvConfig.blockchains.base.chainId.toString(),
                toChain: EnvConfig.blockchains.ethereum.chainId.toString(),
              };
            }

            actions.push(buildAction);
          }

          break;
        }
      }
    }

    return actions;
  }
}
