import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { NonFungibleToken, ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Ask: '0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330',
  Bid: '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be',
  Collect: '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
  Deposit: '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
  Withdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
  Harvest: '0xc9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cba',
  TakerAskV2: '0x9aaa45d6db2ef74ead0751ea9113263d1dec1b50cea05f0ca2002cb8063564a4',
  TakerBidV2: '0x3ee3de4684413690dee6fff1a0a4f92916a1b97d1c5a83cdf24671844306b2e3',
};

export class LooksrareAdapter extends Adapter {
  public readonly name: string = 'adapter.looksrare';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Ask]: EventSignatureMapping[Signatures.Ask],
      [Signatures.Bid]: EventSignatureMapping[Signatures.Bid],
      [Signatures.Collect]: EventSignatureMapping[Signatures.Collect],
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Harvest]: EventSignatureMapping[Signatures.Harvest],
      [Signatures.TakerAskV2]: EventSignatureMapping[Signatures.TakerAskV2],
      [Signatures.TakerBidV2]: EventSignatureMapping[Signatures.TakerBidV2],
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

      let event;
      if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
        event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
      } else {
        event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      }

      if (signature === Signatures.Collect) {
        // collect loyalty fee
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
      } else if (
        signature === Signatures.Deposit ||
        signature === Signatures.Withdraw ||
        signature === Signatures.Harvest
      ) {
        // LOOKS staking
        const user = normalizeAddress(event.user);
        const amount = new BigNumber(event.amount)
          .dividedBy(new BigNumber(10).pow(Tokens.ethereum.LOOKS.decimals))
          .toString(10);
        const harvestAmount = new BigNumber(event.harvestedAmount)
          .dividedBy(new BigNumber(10).pow(Tokens.ethereum.WETH.decimals))
          .toString(10);

        if (signature === Signatures.Harvest) {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [user],
            tokens: [Tokens.ethereum.WETH],
            tokenAmounts: [harvestAmount],
            readableString: `${user} collect ${amount} ${Tokens.ethereum.WETH.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else {
          return {
            protocol: this.config.protocol,
            action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
            addresses: [user],
            tokens: [Tokens.ethereum.LOOKS],
            tokenAmounts: [amount],
            readableString: `${user} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
              Tokens.ethereum.LOOKS.symbol
            } on ${this.config.protocol} chain ${chain}`,
            addition: {
              harvest: {
                token: Tokens.ethereum.WETH,
                amount: harvestAmount,
              },
            },
          };
        }
      } else if (signature === Signatures.Ask || signature === Signatures.Bid) {
        // NFT trading
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
      } else if (signature === Signatures.TakerAskV2 || signature === Signatures.TakerBidV2) {
        // NFT trading v2
        const nftList: Array<NonFungibleToken | null> = [];
        for (const tokenId of event.itemIds) {
          nftList.push(await this.getWeb3Helper().getNonFungibleTokenData(chain, event.collection, tokenId.toString()));
        }
        const paymentToken = await this.getWeb3Helper().getErc20Metadata(chain, event.currency);
        if (paymentToken && nftList.length > 0) {
          const seller =
            signature === Signatures.TakerAskV2
              ? normalizeAddress(event.askUser)
              : normalizeAddress(event.feeRecipients[0]);
          const buyer = normalizeAddress(event.bidUser);
          const price = new BigNumber(event.feeAmounts[0])
            .dividedBy(new BigNumber(10).pow(paymentToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'buy',
            addresses: [buyer, seller],
            tokens: [paymentToken],
            tokenAmounts: [price],
            addition:
              nftList.length === 1
                ? {
                    ...nftList[0],
                  }
                : {
                    nftList: nftList,
                  },
            readableString: `${buyer} buy ${nftList.length} NFT for ${price} ${paymentToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
