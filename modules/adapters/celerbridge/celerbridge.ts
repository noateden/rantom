import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { CommonChainIdMaps } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { CelerbridgeMappings } from './abis';

const Signatures = {
  Send: '0x89d8051e597ab4178a863a5190407b98abfeff406aa8db90c59af76612e58f01',
  Replay: '0x79fa08de5149d912dce8e5e8da7a7c17ccdf23dd5d3bfe196802e6eb86347c7c',
};

export class CelerbridgeAdapter extends Adapter {
  public readonly name: string = 'adapter.celerbridge';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Send]: CelerbridgeMappings[Signatures.Send],
      [Signatures.Replay]: CelerbridgeMappings[Signatures.Replay],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
      if (token) {
        const sender = normalizeAddress(event.sender);
        const receiver = normalizeAddress(event.receiver);
        const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        const fromChain =
          signature === Signatures.Send ? CommonChainIdMaps[chain].toString() : event.srcChainId.toString();
        const toChain =
          signature === Signatures.Send ? event.dstChainId.toString() : CommonChainIdMaps[chain].toString();

        return {
          protocol: this.config.protocol,
          action: 'bridge',
          tokens: [token],
          tokenAmounts: [amount],
          addresses: [sender, receiver],
          readableString: `${sender} bridge ${amount} ${token.symbol} from ${fromChain} to ${toChain} on ${this.config.protocol}`,
          addition: {
            fromChain: fromChain,
            toChain: toChain,
          },
        };
      }
    }

    return null;
  }
}
