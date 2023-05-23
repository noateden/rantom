import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import Erc20Abi from '../configs/abi/ERC20.json';
import Erc721Abi from '../configs/abi/ERC721.json';
import { AddressZero, HardCodeTokens, HardcodeNft, Tokens } from '../configs/constants';
import EnvConfig from '../configs/envConfig';
import { compareAddress, normalizeAddress } from '../lib/helper';
import logger from '../lib/logger';
import { UniswapHelper } from '../modules/adapters/uniswap/helper';
import { NonFungibleToken, NonFungibleTokenMetadata, Token } from '../types/configs';
import { IMongodbProvider, IWeb3HelperProvider } from '../types/namespaces';
import { CachingHelper, CachingProvider } from './caching';

export class Web3HelperProvider extends CachingProvider implements IWeb3HelperProvider {
  public readonly name: string = 'web3';

  constructor(mongodb: IMongodbProvider | null) {
    super(mongodb);
  }

  public async getBlockTime(chain: string, blockNumber: number): Promise<number> {
    const key = CachingHelper.getBlockTimeCacheName(chain, blockNumber);
    const cachingData = await this.getCachingData(key);
    if (cachingData) {
      return Number(cachingData.timestamp);
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    try {
      const block = await web3.eth.getBlock(blockNumber);
      if (block) {
        await this.setCachingData(key, { timestamp: Number(block.timestamp) });
        return Number(block.timestamp);
      }
    } catch (e: any) {
      logger.onError({
        service: this.name,
        message: 'failed to get block data',
        props: {
          chain,
          blockNumber,
        },
        error: e,
      });

      // critical error
      process.exit(0);
    }

    return 0;
  }

  public async getErc20Metadata(chain: string, tokenAddress: string): Promise<Token | null> {
    const key = CachingHelper.getErc20CacheName(chain, tokenAddress);

    if (compareAddress(tokenAddress, AddressZero)) {
      return Tokens[chain].NativeCoin;
    }

    if (HardCodeTokens[key]) {
      return HardCodeTokens[key];
    }

    for (const [, token] of Object.entries(Tokens[chain])) {
      if (compareAddress(token.address, tokenAddress)) {
        return token;
      }
    }

    const cachingData = await this.getCachingData(key);
    if (cachingData) {
      return cachingData.token;
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(Erc20Abi as any, tokenAddress);
    try {
      const [symbol, decimals] = await Promise.all([
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);

      const token: Token = {
        chain,
        address: normalizeAddress(tokenAddress),
        symbol: symbol,
        decimals: new BigNumber(decimals.toString()).toNumber(),
      };

      await this.setCachingData(key, { token });

      return token;
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to get erc20 metadata',
        props: {
          chain,
          token: normalizeAddress(tokenAddress),
          error: e.message,
        },
      });
    }

    return null;
  }

  public async getNonFungibleTokenMetadata(
    chain: string,
    tokenAddress: string
  ): Promise<NonFungibleTokenMetadata | null> {
    const key = CachingHelper.getNftCacheName(chain, tokenAddress);

    if (HardcodeNft[key]) {
      return HardcodeNft[key];
    }

    const cachingData = await this.getCachingData(key);
    if (cachingData) {
      return cachingData.token;
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(Erc721Abi as any, tokenAddress);

    try {
      const [symbol] = await Promise.all([contract.methods.name().call()]);

      const token: NonFungibleTokenMetadata = {
        chain,
        address: normalizeAddress(tokenAddress),
        symbol: symbol,
      };

      await this.setCachingData(key, { token });

      return token;
    } catch (e: any) {
      const token: NonFungibleTokenMetadata = {
        chain,
        address: normalizeAddress(tokenAddress),
        symbol: 'NFT',
      };

      await this.setCachingData(key, { token });

      return token;
    }
  }

  public async getNonFungibleTokenData(
    chain: string,
    tokenAddress: string,
    tokenId: string
  ): Promise<NonFungibleToken | null> {
    const key = CachingHelper.getNftDataCacheName(chain, tokenAddress, tokenId);

    const cachingData = await this.getCachingData(key);
    if (cachingData) {
      return cachingData.token;
    }

    // const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    // const contract = new web3.eth.Contract(Erc721Abi as any, tokenAddress);

    const metadata: NonFungibleTokenMetadata | null = await this.getNonFungibleTokenMetadata(chain, tokenAddress);

    if (metadata) {
      return {
        ...metadata,
        tokenId: tokenId,
        image: '',
      };
    }
    // if (metadata) {
    //   try {
    //     // try to get tokenURI with ERC721 standard
    //     const tokenUri = transformToHttpUrl(await contract.methods.tokenURI(new BigNumber(tokenId).toNumber()).call());
    //     const response = await axios.get(tokenUri);
    //
    //     const token: NonFungibleToken = {
    //       ...metadata,
    //       tokenId: tokenId,
    //       image: transformToHttpUrl(response.data.image),
    //     };
    //
    //     await this.setCachingData(key, { token });
    //
    //     return token;
    //   } catch (e: any) {
    //     try {
    //       // try to get tokenURI with ERC1155 standard
    //       const erc1155Contract = new web3.eth.Contract(Erc1155Abi as any, tokenAddress);
    //       const tokenUri = transformToHttpUrl(
    //         await erc1155Contract.methods.uri(new BigNumber(tokenId).toNumber()).call()
    //       );
    //
    //       const response = await axios.get(tokenUri);
    //
    //       const token: NonFungibleToken = {
    //         ...metadata,
    //         tokenId: tokenId,
    //         image: transformToHttpUrl(response.data.image),
    //       };
    //
    //       await this.setCachingData(key, { token });
    //
    //       return token;
    //     } catch (e: any) {
    //       const token: NonFungibleToken = {
    //         ...metadata,
    //         tokenId: tokenId,
    //         image: '',
    //       };
    //
    //       await this.setCachingData(key, { token });
    //
    //       return token;
    //     }
    //   }
    // }

    return null;
  }

  public async getUniPoolFactoryAddress(chain: string, poolAddress: string): Promise<string | null> {
    const key = CachingHelper.getUniswapPoolFactoryName(chain, poolAddress);

    const cachingData = await this.getCachingData(key);
    if (cachingData) {
      return cachingData.factory;
    }

    const factory = await UniswapHelper.getFactoryAddress(chain, poolAddress);
    await this.setCachingData(key, { factory });

    return factory;
  }
}
