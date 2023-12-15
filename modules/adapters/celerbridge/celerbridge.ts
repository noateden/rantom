import EnvConfig from '../../../configs/envConfig';
import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CelerbridgeAbiMappings, CelerbridgeEventSignatures } from './abis';

export default class CelerbridgeAdapter extends Adapter {
  public readonly name: string = 'adapter.celerbridge';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = CelerbridgeAbiMappings;
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

      const token = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.token,
      });
      if (token) {
        const sender = normalizeAddress(event.sender);
        const receiver = normalizeAddress(event.receiver);
        const amount = formatFromDecimals(event.amount.toString(), token.decimals);

        const fromChain =
          signature === CelerbridgeEventSignatures.Send
            ? EnvConfig.blockchains[options.chain].chainId.toString()
            : event.srcChainId.toString();
        const toChain =
          signature === CelerbridgeEventSignatures.Send
            ? event.dstChainId.toString()
            : EnvConfig.blockchains[options.chain].chainId.toString();

        const buildAction = this.buildUpAction({
          ...options,
          action: 'bridge',
          addresses: [sender, receiver],
          tokens: [token],
          tokenAmounts: [amount],
        });

        buildAction.addition = {
          fromChain,
          toChain,
        };

        actions.push(buildAction);
      }
    }

    return actions;
  }
}
