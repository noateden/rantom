import { TokenList } from '../../../configs';
import { Compoundv3Market } from '../../../configs/protocols/compound';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferEventSignatures } from '../transfer/abis';
import { CompoundAbiMappings, Compoundv3EventSignatures } from './abis';

export default class Compoundv3Adapter extends Adapter {
  public readonly name: string = 'adapter.compoundv3';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = {
      [Compoundv3EventSignatures.Supply]: CompoundAbiMappings[Compoundv3EventSignatures.Supply],
      [Compoundv3EventSignatures.Withdraw]: CompoundAbiMappings[Compoundv3EventSignatures.Withdraw],
      [Compoundv3EventSignatures.SupplyCollateral]: CompoundAbiMappings[Compoundv3EventSignatures.SupplyCollateral],
      [Compoundv3EventSignatures.WithdrawCollateral]: CompoundAbiMappings[Compoundv3EventSignatures.WithdrawCollateral],
      [Compoundv3EventSignatures.AbsorbCollateral]: CompoundAbiMappings[Compoundv3EventSignatures.AbsorbCollateral],
      [Compoundv3EventSignatures.RewardClaimed]: CompoundAbiMappings[Compoundv3EventSignatures.RewardClaimed],
    };
  }

  protected getMarketConfig(marketAddress: string): Compoundv3Market | null {
    for (const market of this.config.contracts) {
      if (compareAddress(marketAddress, market.address)) {
        return market as Compoundv3Market;
      }
    }

    return null;
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

      if (signature === Compoundv3EventSignatures.RewardClaimed) {
        const claimer = normalizeAddress(event.src);
        const recipient = normalizeAddress(event.recipient);
        const amount = formatFromDecimals(event.amount.toString(), 18);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'collect',
            addresses: [claimer, recipient],
            tokens: [TokenList.ethereum.COMP],
            tokenAmounts: [amount],
          })
        );
      } else {
        const marketConfig = this.getMarketConfig(options.log.address);
        if (marketConfig) {
          let token = null;
          let action: KnownAction = 'deposit';
          switch (signature) {
            case Compoundv3EventSignatures.Supply:
            case Compoundv3EventSignatures.Withdraw: {
              token = marketConfig.baseToken;

              if (signature === Compoundv3EventSignatures.Supply) {
                action = 'repay';

                // on compound v3, we detect supply transaction by looking Transfer event from the same transaction
                // when user deposit base asset, if there is a Transfer event emitted on transaction,
                // the transaction action is deposit, otherwise, the transaction action is repay.
                for (const log of options.allLogs) {
                  if (
                    log.topics[0] === TransferEventSignatures.Transfer &&
                    this.supportedContract(options.chain, log.address)
                  ) {
                    // supply transaction
                    action = 'deposit';
                  }
                }
              } else {
                action = 'borrow';

                // we detect a withdrawal transaction by looking for Transfer to zero address event
                for (const log of options.allLogs) {
                  if (
                    log.topics[0] === TransferEventSignatures.Transfer &&
                    this.supportedContract(options.chain, log.address)
                  ) {
                    // withdraw transaction
                    action = 'withdraw';
                  }
                }
              }
              break;
            }
            case Compoundv3EventSignatures.SupplyCollateral: {
              action = 'deposit';
              break;
            }
            case Compoundv3EventSignatures.WithdrawCollateral: {
              action = 'withdraw';
              break;
            }
            case Compoundv3EventSignatures.AbsorbCollateral: {
              action = 'liquidate';
              break;
            }
          }

          if (token) {
            let user = event.from ? normalizeAddress(event.from) : normalizeAddress(event.src);
            if (signature === Compoundv3EventSignatures.AbsorbCollateral) {
              user = normalizeAddress(event.absorber);
            }

            const amount = formatFromDecimals(
              event.amount ? event.amount.toString() : event.collateralAbsorbed.toString(),
              token.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
        }
      }
    }

    return actions;
  }
}
