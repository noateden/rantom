import BigNumber from 'bignumber.js';

import VesselManagerAbi from '../../../configs/abi/gravita/VesselManager.json';
import { GravitaConfig } from '../../../configs/protocols/gravita';
import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { GravitaAbiMappings } from './abis';

export default class GravitaAdapter extends Adapter {
  public readonly name: string = 'adapter.gravita';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = GravitaAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const asset = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event._asset,
      });
      if (asset) {
        const config: GravitaConfig = this.config as GravitaConfig;

        const borrower = normalizeAddress(event._borrower);
        const debtAMount = formatFromDecimals(event._debt.toString(), config.debtToken.decimals);
        const collateralAmount = formatFromDecimals(event._coll.toString(), asset.decimals);

        const operation = Number(event.operation);
        if (operation === 0) {
          // open vault
          actions.push(
            this.buildUpAction({
              ...options,
              action: 'borrow',
              addresses: [borrower],
              tokens: [config.debtToken],
              tokenAmounts: [debtAMount],
            })
          );
          actions.push({
            ...this.buildUpAction({
              ...options,
              action: 'deposit',
              addresses: [borrower],
              tokens: [asset],
              tokenAmounts: [collateralAmount],
            }),
            logIndex: `${options.log.logIndex}:1`,
          });
        } else if (operation === 1 || operation === 2) {
          // adjust vault
          const vaultPreviousState = await this.services.blockchain.singlecall({
            chain: options.chain,
            abi: VesselManagerAbi,
            target: config.vesselManager.address,
            method: 'Vessels',
            params: [borrower, asset.address],
            blockNumber: Number(options.log.blockNumber) - 1,
          });
          if (vaultPreviousState) {
            const previousDebt = new BigNumber(vaultPreviousState.debt.toString());
            const previousColl = new BigNumber(vaultPreviousState.coll.toString());

            if (operation === 1) {
              // close vault
              actions.push(
                this.buildUpAction({
                  ...options,
                  action: 'repay',
                  addresses: [borrower],
                  tokens: [config.debtToken],
                  tokenAmounts: [formatFromDecimals(previousDebt.toString(10), config.debtToken.decimals)],
                })
              );
              actions.push({
                ...this.buildUpAction({
                  ...options,
                  action: 'withdraw',
                  addresses: [borrower],
                  tokens: [asset],
                  tokenAmounts: [formatFromDecimals(previousColl.toString(10), asset.decimals)],
                }),
                logIndex: `${options.log.logIndex}:1`,
              });
            } else {
              const diffDebt = new BigNumber(event._debt.toString()).minus(previousDebt);
              const diffColl = new BigNumber(event._coll.toString()).minus(previousColl);
              const action: KnownAction = diffDebt.gte(0) ? 'borrow' : 'repay';
              const subAction: KnownAction = diffColl.gte(0) ? 'deposit' : 'withdraw';

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: action,
                  addresses: [borrower],
                  tokens: [config.debtToken],
                  tokenAmounts: [formatFromDecimals(diffDebt.abs().toString(10), config.debtToken.decimals)],
                })
              );
              actions.push({
                ...this.buildUpAction({
                  ...options,
                  action: subAction,
                  addresses: [borrower],
                  tokens: [asset],
                  tokenAmounts: [formatFromDecimals(diffColl.abs().toString(10), asset.decimals)],
                }),
                logIndex: `${options.log.logIndex}:1`,
              });
            }
          }
        }
      }
    }

    return actions;
  }
}
