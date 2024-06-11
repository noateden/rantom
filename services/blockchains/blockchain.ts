import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { TokenList } from '../../configs';
import ERC20Abi from '../../configs/abi/ERC20.json';
import ERC721Abi from '../../configs/abi/ERC721.json';
import ERC1155Abi from '../../configs/abi/ERC1155.json';
import { AddressE, AddressF, AddressZero } from '../../configs/constants/addresses';
import { InterfaceIdErc721, InterfaceIdErc1155 } from '../../configs/constants/eips';
import { HardcodeNfts, HardcodeTokens, MockingTokens } from '../../configs/constants/hardcodeTokens';
import { NativeTokens } from '../../configs/constants/nativeTokens';
import EnvConfig from '../../configs/envConfig';
import logger from '../../lib/logger';
import { compareAddress, normalizeAddress } from '../../lib/utils';
import { NonFungibleToken, Token } from '../../types/configs';
import {
  ContractCall,
  GetNonFungibleTokenOptions,
  GetTokenOptions,
  GetTransactionOptions,
  IBlockchainService,
} from './domains';

export default class BlockchainService implements IBlockchainService {
  public readonly name: string = 'blockchain';
  public readonly providers: { [key: string]: Web3 } = {};

  constructor() {}

  public getProvider(chain: string): Web3 {
    if (!this.providers[chain]) {
      // get config and initialize a new provider
      this.providers[chain] = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    }

    return this.providers[chain];
  }

  public async getBlock(chain: string, blockNumber: number): Promise<any> {
    try {
      return await this.getProvider(chain).eth.getBlock(blockNumber);
    } catch (e: any) {
      logger.warn('failed to get block from blockchain', {
        service: this.name,
        chain: chain,
        blockNumber: blockNumber,
        error: e.message,
      });
    }

    return null;
  }

  public async getBlockTimestamp(chain: string, blockNumber: number): Promise<number> {
    try {
      const block = await this.getProvider(chain).eth.getBlock(blockNumber);
      return Number(block.timestamp);
    } catch (e: any) {
      logger.error('failed to get block from blockchain', {
        service: this.name,
        chain: chain,
        blockNumber: blockNumber,
        error: e.message,
      });
    }

    return 0;
  }

  public async getTokenInfo(options: GetTokenOptions): Promise<Token | null> {
    const { chain, onchain } = options;
    const address = normalizeAddress(options.address);

    if (!onchain) {
      // get from hard codes
      if (
        compareAddress(address, AddressZero) ||
        compareAddress(address, AddressE) ||
        compareAddress(address, AddressF)
      ) {
        return {
          chain: chain,
          address: normalizeAddress(address),
          ...NativeTokens[chain],
        };
      }

      // get from mocking
      for (const [symbol, mockAddresses] of Object.entries(MockingTokens)) {
        for (const mockAddress of mockAddresses) {
          if (compareAddress(mockAddress, address)) {
            return {
              chain,
              symbol,
              decimals: 18,
              address: normalizeAddress(address),
            };
          }
        }
      }

      const key = `erc20-${chain}-${address}`;
      if (HardcodeTokens[key]) {
        return HardcodeTokens[key];
      }

      // get from static config
      if (TokenList[chain]) {
        for (const [, token] of Object.entries(TokenList[chain])) {
          if (compareAddress(address, token.address)) {
            return token;
          }
        }
      }
    }

    // query on-chain data
    try {
      const symbol = await this.singlecall({
        chain: chain,
        target: address,
        abi: ERC20Abi,
        method: 'symbol',
        params: [],
      });
      const decimals = await this.singlecall({
        chain: chain,
        target: address,
        abi: ERC20Abi,
        method: 'decimals',
        params: [],
      });

      return {
        chain,
        address: normalizeAddress(address),
        symbol,
        decimals: new BigNumber(decimals.toString()).toNumber(),
      };
    } catch (e: any) {
      logger.warn('failed to get token info', {
        service: this.name,
        chain: chain,
        token: address,
        error: e.message,
      });
    }

    return null;
  }

  public async getNonFungibleTokenInfo(options: GetNonFungibleTokenOptions): Promise<NonFungibleToken | null> {
    const { chain } = options;
    const address = normalizeAddress(options.address);

    if (HardcodeNfts[`${options.chain}-${normalizeAddress(options.address)}`]) {
      return {
        chain,
        address: normalizeAddress(address),
        name: HardcodeNfts[`${options.chain}-${normalizeAddress(options.address)}`].name,
        eip: HardcodeNfts[`${options.chain}-${normalizeAddress(options.address)}`].eip,
        tokenId: options.tokenId,
      };
    }

    // get EIP standard by query supportsInterface
    let token: NonFungibleToken | null = null;
    try {
      const name = await this.singlecall({
        chain: chain,
        target: address,
        abi: ERC721Abi,
        method: 'name',
        params: [],
      });

      const supportInterfaceIdErc721 = await this.singlecall({
        chain: chain,
        target: address,
        abi: ERC721Abi,
        method: 'supportsInterface',
        params: [InterfaceIdErc721],
      });

      if (supportInterfaceIdErc721) {
        token = {
          chain: options.chain,
          address: normalizeAddress(options.address),
          eip: 'ERC721',
          name: name,
          tokenId: options.tokenId,
        };
      } else {
        const supportInterfaceIdErc1155 = await this.singlecall({
          chain: chain,
          target: address,
          abi: ERC1155Abi,
          method: 'supportsInterface',
          params: [InterfaceIdErc1155],
        });
        if (supportInterfaceIdErc1155) {
          token = {
            chain: options.chain,
            address: normalizeAddress(options.address),
            eip: 'ERC1155',
            name: name,
            tokenId: options.tokenId,
          };
        }
      }
    } catch (e: any) {}

    return token;
  }

  public async getTransaction(options: GetTransactionOptions): Promise<any | null> {
    try {
      return await this.getProvider(options.chain).eth.getTransaction(options.hash);
    } catch (e: any) {
      return null;
    }
  }

  public async getTransactionReceipt(options: GetTransactionOptions): Promise<any | null> {
    try {
      return await this.getProvider(options.chain).eth.getTransactionReceipt(options.hash);
    } catch (e: any) {
      return null;
    }
  }

  public async singlecall(call: ContractCall): Promise<any> {
    const startExeTime = Math.floor(new Date().getTime() / 1000);

    const web3 = this.getProvider(call.chain);
    const contract = new web3.eth.Contract(call.abi, call.target);

    let result;
    if (call.blockNumber) {
      result = await contract.methods[call.method](...(call.params as [])).call({}, call.blockNumber);
    } else {
      result = await contract.methods[call.method](...(call.params as [])).call();
    }

    const endExeTime = Math.floor(new Date().getTime() / 1000);
    const elapsed = endExeTime - startExeTime;

    if (elapsed > 5) {
      logger.debug('took too long for onchain single call', {
        service: this.name,
        chain: call.chain,
        target: call.target,
        method: call.method,
        params: call.params.toString(),
      });
    }

    return result;
  }
}
