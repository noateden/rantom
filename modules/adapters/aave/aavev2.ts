import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { AaveAbiMappings, AaveV2EventSignatures } from './abis';

export default class Aavev2Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev2';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = {
      [AaveV2EventSignatures.Deposit]: AaveAbiMappings[AaveV2EventSignatures.Deposit],
      [AaveV2EventSignatures.Withdraw]: AaveAbiMappings[AaveV2EventSignatures.Withdraw],
      [AaveV2EventSignatures.Borrow]: AaveAbiMappings[AaveV2EventSignatures.Borrow],
      [AaveV2EventSignatures.Repay]: AaveAbiMappings[AaveV2EventSignatures.Repay],
      [AaveV2EventSignatures.Flashloan]: AaveAbiMappings[AaveV2EventSignatures.Flashloan],
      [AaveV2EventSignatures.Liquidate]: AaveAbiMappings[AaveV2EventSignatures.Liquidate],
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
      case AaveV2EventSignatures.Deposit:
      case AaveV2EventSignatures.Withdraw:
      case AaveV2EventSignatures.Borrow:
      case AaveV2EventSignatures.Repay: {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.reserve,
        });

        if (token) {
          const user = normalizeAddress(event.user);
          const onBehalfOf = event.onBehalfOf
            ? normalizeAddress(event.onBehalfOf)
            : event.to
            ? normalizeAddress(event.to)
            : normalizeAddress(event.repayer);

          const amount = formatFromDecimals(event.amount.toString(), token.decimals);

          let action: KnownAction = 'deposit';
          if (signature === AaveV2EventSignatures.Withdraw) {
            action = 'withdraw';
          }
          if (signature === AaveV2EventSignatures.Borrow) {
            action = 'borrow';
          }
          if (signature === AaveV2EventSignatures.Repay) {
            action = 'repay';
          }

          actions.push(
            this.buildUpAction({
              ...options,
              action: action,
              addresses: [user, onBehalfOf],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }
        break;
      }
      case AaveV2EventSignatures.Flashloan: {
        const token = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.asset,
        });
        if (token) {
          const initiator = normalizeAddress(event.initiator);
          const target = normalizeAddress(event.target);

          const amount = formatFromDecimals(event.amount.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'flashloan',
              addresses: [target, initiator],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        }

        break;
      }
      case AaveV2EventSignatures.Liquidate: {
        const collateral = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: event.collateralAsset,
        });
        if (collateral) {
          const user = normalizeAddress(event.user);
          const liquidator = normalizeAddress(event.liquidator);

          const amount = formatFromDecimals(event.liquidatedCollateralAmount.toString(), collateral.decimals);

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
