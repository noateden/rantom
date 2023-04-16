import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Buy: '0xdddcdb07e460849cf04a4445b7af9faf01b7f5c7ba75deaf969ac5ed830312c3',
};

export class RaribleAdapter extends Adapter {
  public readonly name: string = 'adapter.rarible';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Buy]: EventSignatureMapping[Signatures.Buy],
    });
  }
  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let token: Token | null = await this.getWeb3Helper().getErc20Metadata(chain, event.sellToken);
      if (token) {
        // buy token is a NFT
        const nftData = await this.getWeb3Helper().getNonFungibleTokenData(chain, event.buyToken, event.buyTokenId);
        const seller = normalizeAddress(event.buyer);
        const buyer = normalizeAddress(event.owner);
        const amount = new BigNumber(event.sellValue).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        if (nftData) {
          return {
            protocol: this.config.protocol,
            action: 'buy',
            addresses: [buyer, seller],
            tokens: [token],
            tokenAmounts: [amount],
            addition: {
              ...nftData,
              amount: '1',
            },
            readableString: `${buyer} buy [TokenId:${nftData.tokenId}] ${nftData.symbol} for ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        // buy token is a ERC20
        token = await this.getWeb3Helper().getErc20Metadata(chain, event.buyToken);
        if (token) {
          const nftData = await this.getWeb3Helper().getNonFungibleTokenData(chain, event.sellToken, event.sellTokenId);
          const seller = normalizeAddress(event.owner);
          const buyer = normalizeAddress(event.buyer);
          const amount = new BigNumber(event.buyValue).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

          if (nftData) {
            return {
              protocol: this.config.protocol,
              action: 'buy',
              addresses: [buyer, seller],
              tokens: [token],
              tokenAmounts: [amount],
              addition: {
                ...nftData,
                amount: '1',
              },
              readableString: `${buyer} buy [TokenId:${nftData.tokenId}] ${nftData.symbol} for ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
