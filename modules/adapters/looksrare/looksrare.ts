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
  Ask: '0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330',
  Bid: '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be',
  Collect: '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
};

export class LooksrareAdapter extends Adapter {
  public readonly name: string = 'adapter.looksrare';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Ask]: EventSignatureMapping[Signatures.Ask],
      [Signatures.Bid]: EventSignatureMapping[Signatures.Bid],
      [Signatures.Collect]: EventSignatureMapping[Signatures.Collect],
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

      if (signature === Signatures.Collect) {
        const paymentToken = await this.getWeb3Helper().getErc20Metadata(chain, event.currency);
        if (paymentToken) {
          const collector = normalizeAddress(event.royaltyRecipient);
          const amount = new BigNumber(event.amount)
            .dividedBy(new BigNumber(10).pow(paymentToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [collector],
            tokens: [paymentToken],
            tokenAmounts: [amount],
            readableString: `${collector} collect ${amount} ${paymentToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        const nftData = await this.getWeb3Helper().getNonFungibleTokenData(
          chain,
          event.collection,
          event.tokenId.toString()
        );
        const paymentToken = await this.getWeb3Helper().getErc20Metadata(chain, event.currency);
        if (paymentToken && nftData) {
          const seller = signature === Signatures.Bid ? normalizeAddress(event.maker) : normalizeAddress(event.taker);
          const buyer = signature === Signatures.Bid ? normalizeAddress(event.taker) : normalizeAddress(event.maker);
          const price = new BigNumber(event.price).dividedBy(new BigNumber(10).pow(paymentToken.decimals)).toString(10);

          return {
            protocol: this.config.protocol,
            action: 'buy',
            addresses: [buyer, seller],
            tokens: [paymentToken],
            tokenAmounts: [price],
            addition: {
              ...nftData,
              amount: event.amount.toString(),
            },
            readableString: `${buyer} buy ${event.amount} [TokenId:${event.tokenId}] ${nftData.symbol} for ${price} ${paymentToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
