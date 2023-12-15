import { CompoundConfig, CompoundMarket } from '../../../configs/protocols/compound';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import CompoundAdapter from '../compound/compound';
import { IronbankAbiMappings, IronbankEventSignatures } from './abis';

export default class IronbankAdapter extends CompoundAdapter {
  public readonly name: string = 'adapter.ironbank';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings[IronbankEventSignatures.Flashloan] = IronbankAbiMappings[IronbankEventSignatures.Flashloan];
  }

  protected getUnderlyingToken(cTokenAddress: string): Token | null {
    for (const market of (this.config as CompoundConfig).contracts) {
      if (compareAddress(cTokenAddress, market.address)) {
        return (market as CompoundMarket).underlying;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = await super.parseEventLog(options);

    if (actions.length > 0) {
      return actions;
    }

    const signature = options.log.topics[0];
    if (signature === IronbankEventSignatures.Flashloan && this.supportedContract(options.chain, options.log.address)) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const token = this.getUnderlyingToken(options.log.address);
      if (token) {
        const receiver = normalizeAddress(event.receiver);
        const amount = formatFromDecimals(event.amount, token.decimals);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'flashloan',
            addresses: [receiver],
            tokens: [token],
            tokenAmounts: [amount],
          })
        );
      }
    }

    return actions;
  }
}
