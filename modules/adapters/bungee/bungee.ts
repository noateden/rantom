import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { CommonChainIdMaps } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  SocketBridge: '0x74594da9e31ee4068e17809037db37db496702bf7d8d63afe6f97949277d1609',
};

export class BungeeAdapter extends Adapter {
  public readonly name: string = 'adapter.bungee';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.SocketBridge]: EventSignatureMapping[Signatures.SocketBridge],
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

        return {
          protocol: this.config.protocol,
          action: 'bridge',
          tokens: [token],
          tokenAmounts: [amount],
          addresses: [sender, receiver],
          readableString: `${sender} bridge ${amount} ${
            token.symbol
          } from ${chain} to ${event.toChainId.toString()} on ${this.config.protocol}`,
          addition: {
            fromChain: CommonChainIdMaps[chain].toString(),
            toChain: event.toChainId.toString(),
          },
        };
      }
    }

    return null;
  }
}
