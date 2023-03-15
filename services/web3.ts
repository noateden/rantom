import axios from 'axios';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import Erc20Abi from '../configs/abi/ERC20.json';
import Erc721Abi from '../configs/abi/ERC721.json';
import Erc1155Abi from '../configs/abi/ERC1155.json';
import { AddressZero, HardCodeTokens, HardcodeNft, Tokens } from '../configs/constants';
import EnvConfig from '../configs/envConfig';
import { compareAddress, normalizeAddress, transformToHttpUrl } from '../lib/helper';
import logger from '../lib/logger';
import { Token } from '../types/configs';
import { NonFungibleTokenData } from '../types/domains';
import { IWeb3HelperProvider } from '../types/namespaces';
import SentryProvider from './sentry';

export class Web3HelperProvider implements IWeb3HelperProvider {
  public readonly name: string = 'web3';

  private _blockTimes: { [key: string]: number } = {};
  private _erc20MetadataCache: { [key: string]: Token } = {};
  private _erc721MetadataCache: { [key: string]: Token } = {};

  public async getBlockTime(chain: string, blockNumber: number): Promise<number> {
    const key = `${chain}:${blockNumber}`;
    if (this._blockTimes[key]) {
      return this._blockTimes[key];
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    try {
      const block = await web3.eth.getBlock(blockNumber);
      if (block) {
        this._blockTimes[key] = new BigNumber(block.timestamp.toString()).toNumber();
        return this._blockTimes[key];
      }
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to get block data',
        props: {
          chain,
          blockNumber,
          error: e.message,
        },
      });
    }

    return 0;
  }

  public async getErc20Metadata(chain: string, tokenAddress: string): Promise<Token | null> {
    const key = `${chain}:${normalizeAddress(tokenAddress)}`;

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

    if (this._erc20MetadataCache[key]) {
      return this._erc20MetadataCache[key];
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
      this._erc20MetadataCache[key] = token;

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

  public async getErc721Metadata(chain: string, tokenAddress: string): Promise<Token | null> {
    const key = `${chain}:${normalizeAddress(tokenAddress)}`;

    if (HardcodeNft[key]) {
      return HardcodeNft[key];
    }

    if (this._erc721MetadataCache[key]) {
      return this._erc721MetadataCache[key];
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(Erc721Abi as any, tokenAddress);

    try {
      const [symbol] = await Promise.all([contract.methods.name().call()]);

      const token: Token = {
        chain,
        address: normalizeAddress(tokenAddress),
        symbol: symbol,
        decimals: 0,
        erc721: true,
      };
      this._erc721MetadataCache[key] = token;

      return token;
    } catch (e: any) {
      const token: Token = {
        chain,
        address: normalizeAddress(tokenAddress),
        symbol: 'NFT',
        decimals: 0,
        erc721: true,
      };
      this._erc721MetadataCache[key] = token;

      return token;
    }
  }

  public async getNonFungibleTokenData(
    chain: string,
    tokenAddress: string,
    tokenId: string
  ): Promise<NonFungibleTokenData | null> {
    try {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const contract = new web3.eth.Contract(Erc721Abi as any, tokenAddress);

      const token: Token | null = await this.getErc721Metadata(chain, tokenAddress);
      if (token) {
        try {
          const tokenUri = transformToHttpUrl(
            await contract.methods.tokenURI(new BigNumber(tokenId).toNumber()).call()
          );
          const response = await axios.get(tokenUri);
          return {
            token: token,
            tokenId: tokenId,
            image: transformToHttpUrl(response.data.image),
          };
        } catch (e: any) {
          // try with ERC1155
          const erc1155Contract = new web3.eth.Contract(Erc1155Abi as any, tokenAddress);
          try {
            const tokenUri = transformToHttpUrl(
              await erc1155Contract.methods.uri(new BigNumber(tokenId).toNumber()).call()
            );
            const response = await axios.get(tokenUri);
            return {
              token: token,
              tokenId: tokenId,
              image: transformToHttpUrl(response.data.image),
            };
          } catch (e: any) {
            return {
              token: token,
              tokenId: tokenId,
              image: '',
            };
          }
        }
      }
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to get non-fungible token data',
        props: {
          chain,
          token: normalizeAddress(tokenAddress),
          tokenId: tokenId,
          error: e.message,
        },
      });
      const sentry = new SentryProvider(EnvConfig.sentry.dns);
      await sentry.captureMessage(
        `Cannot get NonFungible token data ${chain}:${tokenAddress}:${tokenId} error:${e.message}`
      );
    }

    return null;
  }
}
