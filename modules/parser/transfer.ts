import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Signatures } from '../../configs/signatures';
import { normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { Web3HelperProvider } from '../../services/web3';
import { Token } from '../../types/configs';
import { NonFungibleTokenData, TransactionTransfer } from '../../types/domains';
import { GlobalProviders, ITransferParser, IWeb3HelperProvider } from '../../types/namespaces';
import { TransferParseLogOptions } from '../../types/options';

export class TransferParser implements ITransferParser {
  public readonly name = 'transfer';

  public providers: GlobalProviders | null;

  constructor(providers: GlobalProviders | null) {
    this.providers = providers;
  }

  private getWeb3Helper(): IWeb3HelperProvider {
    if (this.providers) {
      return this.providers.web3Helper;
    } else {
      return new Web3HelperProvider();
    }
  }

  public async tryParsingTransfers(options: TransferParseLogOptions): Promise<TransactionTransfer | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (signature === Signatures['Transfer(address,address,uint256)']) {
      const web3 = new Web3();

      try {
        // try with ERC20
        const event = web3.eth.abi.decodeLog(
          [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          data,
          topics.slice(1)
        );
        const token: Token | null = await this.getWeb3Helper().getErc20Metadata(options.chain, options.address);
        if (token) {
          return {
            token,
            from: normalizeAddress(event.from),
            to: normalizeAddress(event.to),
            amount: new BigNumber(event.value.toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10),
          };
        }
      } catch (e: any) {
        try {
          // try with ERC721
          const event = web3.eth.abi.decodeLog(
            [
              {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
              },
              {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            data,
            topics.slice(1)
          );
          const token: NonFungibleTokenData | null = await this.getWeb3Helper().getNonFungibleTokenData(
            options.chain,
            options.address,
            new BigNumber(event.tokenId).toString(10)
          );
          if (token) {
            return {
              ...token,
              from: normalizeAddress(event.from),
              to: normalizeAddress(event.to),
              amount: '1',
              tokenId: new BigNumber(event.tokenId).toString(10),
            };
          }
        } catch (e: any) {
          logger.onError({
            service: this.name,
            message: 'match transfer topic but can not parse data',
            props: {
              chain: chain,
              address: address,
              signature: signature,
            },
          });
        }
      }
    }

    return null;
  }
}
