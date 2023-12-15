import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { AaveAbiMappings, AaveV1EventSignatures } from './abis';

export default class Aavev1Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev1';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = {
      [AaveV1EventSignatures.Deposit]: AaveAbiMappings[AaveV1EventSignatures.Deposit],
      [AaveV1EventSignatures.Redeem]: AaveAbiMappings[AaveV1EventSignatures.Redeem],
      [AaveV1EventSignatures.Borrow]: AaveAbiMappings[AaveV1EventSignatures.Borrow],
      [AaveV1EventSignatures.Repay]: AaveAbiMappings[AaveV1EventSignatures.Repay],
      [AaveV1EventSignatures.Flashloan]: AaveAbiMappings[AaveV1EventSignatures.Flashloan],
      [AaveV1EventSignatures.Liquidate]: AaveAbiMappings[AaveV1EventSignatures.Liquidate],
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    if (!this.eventMappings[signature] || !this.supportedContract(options.chain, options.log.address)) {
      return actions;
    }

    const web3 = this.services.blockchain.getProvider(options.chain);
    const event = web3.eth.abi.decodeLog(
      this.eventMappings[signature].abi,
      options.log.data,
      options.log.topics.slice(1)
    );

    switch (signature) {
      case AaveV1EventSignatures.Deposit:
      case AaveV1EventSignatures.Redeem:
      case AaveV1EventSignatures.Borrow:
      case AaveV1EventSignatures.Repay: {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event._reserve,
        });

        if (token) {
          const user = normalizeAddress(event._user);
          const repayer = event._repayer ? normalizeAddress(event._repayer) : user;
          const amount = event._amount
            ? formatFromDecimals(event._amount.toString(), token.decimals)
            : formatFromDecimals(event._amountMinusFees.toString(), token.decimals);

          let action: KnownAction = 'deposit';
          if (signature === AaveV1EventSignatures.Redeem) {
            action = 'withdraw';
          }
          if (signature === AaveV1EventSignatures.Borrow) {
            action = 'borrow';
          }
          if (signature === AaveV1EventSignatures.Repay) {
            action = 'repay';
          }

          actions.push(
            this.buildUpAction({
              ...options,
              action: action,
              addresses: [user, repayer],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
        break;
      }
      case AaveV1EventSignatures.Flashloan: {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event._reserve,
        });
        if (token) {
          const target = normalizeAddress(event._target);

          const amount = formatFromDecimals(event._amount.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'flashloan',
              addresses: [target],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }

        break;
      }
      case AaveV1EventSignatures.Liquidate: {
        const collateral = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event._collateral,
        });
        if (collateral) {
          const liquidator = normalizeAddress(event._liquidator);
          const user = normalizeAddress(event._user);

          const amount = formatFromDecimals(event._liquidatedCollateralAmount.toString(), collateral.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'liquidate',
              addresses: [liquidator, user],
              tokens: [collateral],
              tokenAmounts: [amount],
            })
          );
        }

        break;
      }
    }

    return actions;
  }
}
