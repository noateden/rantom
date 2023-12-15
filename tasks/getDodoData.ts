// get top tvl DODO pairs
import fs from 'fs';

import DOdoDVMAbi from '../configs/abi/dodo/DVM.json';
import { AddressZero } from '../configs/constants/addresses';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import { LiquidityPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const TopPairs = [
  'ethereum:0x3058ef90929cb8180174d74c507176cca6835d73',
  'ethereum:0xc9f93163c99695c6526b799ebca2207fdf7d61ad',
  'ethereum:0x8876819535b48b551c9e97ebc07332c7482b4b2d',
  'ethereum:0x138c825d993d5ffb7f028408e870ebf50a019543',
  'ethereum:0x75c23271661d9d143dcb617222bc4bec783eff34',
  'ethereum:0x983dfba1c0724786598af0e63a9a6f94aabd24a1',
  'ethereum:0x181d93ea28023bf40c8bb94796c55138719803b4',
  'ethereum:0xcc53b8834d44aa69b1baa2002f5b33270fe55ea2',
  'ethereum:0x46cf01f14ff6f8c7ef4d6a6b139b1c3d45af9289',
  'ethereum:0x39eb9c3ca4ea5c9c54797cb1796e8dd4df3d9d7e',
  'ethereum:0x2109f78b46a789125598f5ad2b7f243751c2934d',
  'ethereum:0x4cf7fa72ffba0588e34883ce0797cec3890ecec4',
  'arbitrum:0xe4b2dfc82977dd2dce7e8d37895a6a8f50cbb4fb',
  'arbitrum:0x19e5910f61882ff6605b576922507f1e1a0302fe',
  'arbitrum:0xfe176a2b1e1f67250d2903b8d25f56c0dabcd6b2',
  'arbitrum:0x6a58c68ff5c4e4d90eb6561449cc74a64f818da5',
  'arbitrum:0x34851ea13bde818b1efe26d31377906b47c9bbe2',
  'arbitrum:0x9340e3296121507318874ce9c04afb4492af0284',
  'arbitrum:0x65e17c52128396443d4a9a61eacf0970f05f8a20',
  'arbitrum:0xb42a054d950dafd872808b3c839fbb7afb86e14c',
  'polygon:0xd028e331c9a29a1b5de87279bf79de5ff04fe98b',
  'polygon:0x813fddeccd0401c4fa73b092b074802440544e52',
  'polygon:0x4b658c395804f90d76aa1995391e4730c7208de7',
  'bnbchain:0xbe60d4c4250438344bec816ec2dec99925deb4c7',
  'bnbchain:0x340a04f0c1e5efbf0c4492f5705274cfdd7f2c08',
  'bnbchain:0xb69fdc6531e08b366616ab30b8481bf4148786cb',
  'bnbchain:0x6064dbd0ff10bfed5a797807042e9f63f18cfe10',
  'bnbchain:0x018e41228b1ebc2f81897150877edbb682272c64',
  'bnbchain:0x107f3be24e3761a91322aa4f5f54d9f18981530c',
  'bnbchain:0xd534fae679f7f02364d177e9d44f1d15963c0dd7',
  'bnbchain:0x083e664b362774317f3be274a2dde8781169617e',
];

(async function () {
  const protocol = 'dodo';

  const blockchain = new BlockchainService(null);

  const allPairs: Array<LiquidityPoolConstant> = [];

  for (const config of TopPairs) {
    const [chain, address] = config.split(':');

    const baseTokenAddress = await blockchain.singlecall({
      chain: chain,
      abi: DOdoDVMAbi,
      target: address,
      method: '_BASE_TOKEN_',
      params: [],
    });
    const quoteTokenAddress = await blockchain.singlecall({
      chain: chain,
      abi: DOdoDVMAbi,
      target: address,
      method: '_QUOTE_TOKEN_',
      params: [],
    });

    const baseToken = await blockchain.getTokenInfo({
      chain: chain,
      address: baseTokenAddress,
    });
    const quoteToken = await blockchain.getTokenInfo({
      chain: chain,
      address: quoteTokenAddress,
    });

    if (baseToken && quoteToken) {
      updateToken(baseToken);
      updateToken(quoteToken);
      allPairs.push({
        chain,
        protocol,
        address: normalizeAddress(address),
        version: 'univ2',
        factory: AddressZero,
        tokens: [baseToken, quoteToken],
      });

      console.info(`Got DODO pool:${address} chain:${chain} tokens:${baseToken.symbol}-${quoteToken.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/DodoLiquidityPools.json`, JSON.stringify(allPairs));
})();
