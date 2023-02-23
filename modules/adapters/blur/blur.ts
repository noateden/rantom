import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  OrdersMatch: '0x61cbb2a3dee0b6064c2e681aadd61677fb4ef319f0b547508d495626f5a62f64',
};

export class BlurAdapter extends Adapter {
  public readonly name: string = 'adapter.blur';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.OrdersMatch]: EventSignatureMapping[Signatures.OrdersMatch],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 && this.eventMappings[signature]) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.OrdersMatch) {
        const nft = await this.getWeb3Helper().getErc721Metadata(chain, (event.buy as any).collection);
        const token = await this.getWeb3Helper().getErc20Metadata(chain, (event.buy as any).paymentToken);

        if (nft && token) {
          const buyer = normalizeAddress((event.buy as any).trader);
          const seller = normalizeAddress((event.sell as any).trader);
          const tokenId = parseInt((event.sell as any).tokenId);
          const amount = parseInt((event.sell as any).amount);
          const tokenPayAmount = new BigNumber((event.buy as any).price.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'buy',
            addresses: [buyer, seller],
            tokens: [token],
            tokenAmounts: [tokenPayAmount],
            addition: {
              token: {
                ...nft,
              },
              tokenId: tokenId,
              amount: amount,
            },
            readableString: `${buyer} buy ${amount} [TokenId:${tokenId}] ${nft.symbol} for ${tokenPayAmount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
