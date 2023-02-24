import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Inventory: '0x3cbb63f144840e5b1b0a38a7c19211d2e89de4d7c5faf8b2d3c1776c302d1d33',
};

export class X2y2Adapter extends Adapter {
  public readonly name: string = 'adapter.x2y2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Inventory]: EventSignatureMapping[Signatures.Inventory],
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
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const payToken = await this.getWeb3Helper().getErc20Metadata(chain, event.currency);
      let nftData = null;
      try {
        const orderItems = web3.eth.abi.decodeParameter(
          {
            components: [
              {
                internalType: 'contract IERC721',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            internalType: 'struct ERC721Delegate.Pair[]',
            name: 'pairs',
            type: 'tuple[]',
          },
          (event.item as any).data
        );
        nftData = await this.getWeb3Helper().getNonFungibleTokenData(
          chain,
          orderItems[0].token,
          orderItems[0].tokenId.toString()
        );
      } catch (e: any) {
        logger.onError({
          service: this.config.protocol,
          message: 'failed to parse order item data',
          props: {
            protocol: this.config.protocol,
            data: (event.item as any).data,
          },
        });
        return null;
      }

      const op = new BigNumber((event.detail as any).op).toNumber();

      if (payToken && nftData && (op === 1 || op === 2)) {
        const taker = normalizeAddress(event.taker);
        const maker = normalizeAddress(event.maker);
        const payAmount = new BigNumber((event.item as any).price)
          .dividedBy(new BigNumber(10).pow(payToken.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'buy',
          addresses: [taker, maker],
          tokens: [payToken],
          tokenAmounts: [payAmount],
          addition: {
            ...nftData,
            amount: '1',
          },
          readableString: `${taker} buy [TokenId:${nftData.tokenId}] ${nftData.token.symbol} for ${payAmount} ${payToken.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
