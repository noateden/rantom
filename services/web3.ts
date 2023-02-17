import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import Erc20Abi from '../configs/abi/ERC20.json';
import Erc721Abi from '../configs/abi/ERC721.json';
import { AddressZero, HardCodeTokens, Tokens } from '../configs/constants';
import EnvConfig from '../configs/envConfig';
import { compareAddress, normalizeAddress } from '../lib/helper';
import logger from '../lib/logger';
import { Token } from '../types/configs';
import { IWeb3HelperProvider } from '../types/namespaces';

export class Web3HelperProvider implements IWeb3HelperProvider {
  public readonly name: string = 'web3';

  private _erc20MetadataCache: { [key: string]: Token } = {};
  private _erc721MetadataCache: { [key: string]: Token } = {};

  public async getErc20Metadata(chain: string, tokenAddress: string): Promise<Token | null> {
    const key = `${chain}:${normalizeAddress(tokenAddress)}`;

    if (compareAddress(tokenAddress, AddressZero)) {
      return Tokens[chain].NativeCoin;
    }

    if (HardCodeTokens[key]) {
      return HardCodeTokens[key];
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
    } catch (e) {
      logger.onError({
        service: this.name,
        message: 'failed to get erc20 metadata',
        props: {
          chain,
          token: normalizeAddress(tokenAddress),
        },
        error: e,
      });
    }

    return null;
  }

  public async getErc721Metadata(chain: string, tokenAddress: string): Promise<Token | null> {
    const key = `${chain}:${normalizeAddress(tokenAddress)}`;

    if (this._erc721MetadataCache[key]) {
      return this._erc721MetadataCache[key];
    }

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(Erc721Abi as any, tokenAddress);

    try {
      const [symbol] = await Promise.all([contract.methods.symbol().call()]);

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
      logger.onError({
        service: this.name,
        message: 'failed to get erc721 metadata',
        props: {
          chain,
          token: normalizeAddress(tokenAddress),
        },
        error: e,
      });
    }

    return null;
  }
}
