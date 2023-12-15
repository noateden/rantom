import { expect } from 'chai';
import { describe } from 'mocha';

import { TokenList } from '../../configs';
import BlockchainService from '../../services/blockchains/blockchain';
import { IBlockchainService } from '../../services/blockchains/domains';

const TokenErc20: Array<any> = [
  TokenList.ethereum.USDC,
  TokenList.ethereum.DAI,
  TokenList.ethereum.USDT,
  TokenList.arbitrum.USDT,
  TokenList.arbitrum.USDC,
  TokenList.arbitrum.DAI,
];

const TokenErc721: Array<any> = [
  {
    chain: 'ethereum',
    address: '0x524cab2ec69124574082676e6f654a18df49a048',
    name: 'LilPudgys',
    eip: 'ERC721',
    tokenId: '0',
  },
  {
    chain: 'ethereum',
    address: '0xe70659b717112ac4e14284d0db2f5d5703df8e43',
    name: 'Project X',
    eip: 'ERC1155',
    tokenId: '1',
  },
];

const service: IBlockchainService = new BlockchainService(null);

describe('blockchain service', async function () {
  describe('getTokenInfo', async function () {
    TokenErc20.map((item: any) =>
      it(`should get token ${item.chain}:${item.symbol} info correctly`, async function () {
        const token = await service.getTokenInfo({
          chain: item.chain,
          address: item.address,
          onchain: true,
        });
        expect(token).not.equal(null);
        expect(token.address).equal(item.address);
        expect(token.symbol).equal(item.symbol);
        expect(token.decimals).equal(item.decimals);
      })
    );
  });
  describe('getNonFungibleTokenInfo', async function () {
    TokenErc721.map((item: any) =>
      it(`should get non fungible token ${item.chain}:${item.name} info correctly`, async function () {
        const token = await service.getNonFungibleTokenInfo({
          chain: item.chain,
          address: item.address,
          tokenId: item.tokenId,
          onchain: true,
        });
        expect(token).not.equal(null);
        expect(token.address).equal(item.address);
        expect(token.tokenId).equal(item.tokenId);
        expect(token.eip).equal(item.eip);
      })
    );
  });
});
