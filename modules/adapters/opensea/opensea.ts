import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  OrderFullFilled: '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31',
};

export class OpenseaAdapter extends Adapter {
  public readonly name: string = 'adapter.opensea';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.OrderFullFilled]: EventSignatureMapping[Signatures.OrderFullFilled],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
      this.eventMappings[signature]
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.OrderFullFilled) {
        const offer = event.offer[0] as any;
        const considerations = event.consideration as any;
        const offerAssetType = parseInt(offer.itemType);
        const offerer = normalizeAddress(event.offerer);
        const recipient = normalizeAddress(event.recipient);
        if (offerAssetType === 0 || offerAssetType === 1) {
          // buy offer
          const nftData = await this.getWeb3Helper().getNonFungibleTokenData(
            chain,
            considerations[0].token,
            considerations[0].identifier
          );
          const token = await this.getWeb3Helper().getErc20Metadata(chain, offer.token);
          if (nftData && token) {
            const amount = new BigNumber(offer.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            return {
              protocol: this.config.protocol,
              action: 'buy',
              addresses: [offerer, recipient],
              tokens: [token],
              tokenAmounts: [amount],
              addition: {
                ...nftData,
                amount: offer.amount,
              },
              readableString: `${offer} buy ${considerations[0].amount} [TokenId:${nftData.tokenId}] ${nftData.token.symbol} for ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } else {
          // sell offer
          const nftData = await this.getWeb3Helper().getNonFungibleTokenData(chain, offer.token, offer.identifier);

          let token: Token | null = null;
          let tokenAmount: BigNumber = new BigNumber(0);

          for (const consideration of considerations) {
            const payToken = await this.getWeb3Helper().getErc20Metadata(chain, consideration.token);
            if (payToken) {
              token = payToken;
              tokenAmount = tokenAmount.plus(
                new BigNumber(consideration.amount).dividedBy(new BigNumber(10).pow(payToken.decimals))
              );
            }
          }

          if (nftData && token) {
            return {
              protocol: this.config.protocol,
              action: 'buy',
              addresses: [recipient, offerer],
              tokens: [token],
              tokenAmounts: [tokenAmount.toString(10)],
              addition: {
                ...nftData,
                amount: offer.amount,
              },
              readableString: `${recipient} buy ${offer.amount} [TokenId:${nftData.tokenId}] ${
                nftData.token.symbol
              } for ${tokenAmount.toString(10)} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
