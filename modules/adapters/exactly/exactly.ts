import { ExactlyConfig, ExactlyMarket } from '../../../configs/protocols/exactly';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ExactlyAbiMappings, ExactlyEventSignatures } from './abis';

export default class ExactlyAdapter extends Adapter {
  public readonly name: string = 'adapter.exactly';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = ExactlyAbiMappings;
  }

  protected getMarket(marketAddress: string): ExactlyMarket | null {
    for (const market of (this.config as ExactlyConfig).contracts) {
      if (compareAddress(marketAddress, market.address)) {
        return market as ExactlyMarket;
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

      const market = this.getMarket(options.log.address);
      if (market) {
        const amount = formatFromDecimals(event.assets.toString(), market.asset.decimals);
        const caller = normalizeAddress(event.caller);
        const user = event.owner ? normalizeAddress(event.owner) : normalizeAddress(event.borrower);
        let action: KnownAction = 'deposit';
        if (signature === ExactlyEventSignatures.Withdraw || signature === ExactlyEventSignatures.WithdrawAtMaturity) {
          action = 'withdraw';
        }
        if (
          signature === ExactlyEventSignatures.Borrow ||
          signature.toString() === ExactlyEventSignatures.BorrowAtMaturity
        ) {
          action = 'borrow';
        }
        if (signature === ExactlyEventSignatures.Repay || signature === ExactlyEventSignatures.RepayAtMaturity) {
          action = 'repay';
        }

        actions.push(
          this.buildUpAction({
            ...options,
            action: action,
            addresses: [caller, user],
            tokens: [market.asset],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
