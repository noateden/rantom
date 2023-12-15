import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { AaveAbiMappings, AaveV3EventSignatures } from './abis';

export default class Aavev3Adapter extends Adapter {
  public readonly name: string = 'adapter.aavev3';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = {
      [AaveV3EventSignatures.Deposit]: AaveAbiMappings[AaveV3EventSignatures.Deposit],
      [AaveV3EventSignatures.Withdraw]: AaveAbiMappings[AaveV3EventSignatures.Withdraw],
      [AaveV3EventSignatures.Borrow]: AaveAbiMappings[AaveV3EventSignatures.Borrow],
      [AaveV3EventSignatures.Repay]: AaveAbiMappings[AaveV3EventSignatures.Repay],
      [AaveV3EventSignatures.Flashloan]: AaveAbiMappings[AaveV3EventSignatures.Flashloan],
      [AaveV3EventSignatures.Liquidate]: AaveAbiMappings[AaveV3EventSignatures.Liquidate],
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
      case AaveV3EventSignatures.Deposit:
      case AaveV3EventSignatures.Withdraw:
      case AaveV3EventSignatures.Borrow:
      case AaveV3EventSignatures.Repay: {
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
          if (signature === AaveV3EventSignatures.Withdraw) {
            action = 'withdraw';
          }
          if (signature === AaveV3EventSignatures.Borrow) {
            action = 'borrow';
          }
          if (signature === AaveV3EventSignatures.Repay) {
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
      case AaveV3EventSignatures.Flashloan: {
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
      case AaveV3EventSignatures.Liquidate: {
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
