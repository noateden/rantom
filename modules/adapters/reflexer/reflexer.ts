import { TokenList } from '../../../configs';
import { AddressZero } from '../../../configs/constants/addresses';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ReflexerAbiMappings, ReflexerEventSignatures } from './abis';

const CoinJoin = '0x0a5653cca4db1b6e265f47caf6969e64f1cfdc45';
const EthJoin = '0x2d3cd7b81c93f188f3cb8ad87c8acc73d6226e3a';

export default class ReflexerAdapter extends Adapter {
  public readonly name: string = 'adapter.reflexer';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = ReflexerAbiMappings;
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

      const user = normalizeAddress(event.usr);
      let action: KnownAction = 'deposit';
      if (compareAddress(options.log.address, EthJoin)) {
        action = signature === ReflexerEventSignatures.Join ? 'deposit' : 'withdraw';
      } else if (compareAddress(options.log.address, CoinJoin)) {
        action = signature === ReflexerEventSignatures.Join ? 'repay' : 'borrow';
      }

      const token: Token = compareAddress(options.log.address, EthJoin)
        ? {
            chain: 'ethereum',
            symbol: 'ETH',
            decimals: 18,
            address: AddressZero,
          }
        : TokenList.ethereum.RAI;
      const amount = formatFromDecimals(event.wad.toString(), token.decimals);

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

    return actions;
  }
}
