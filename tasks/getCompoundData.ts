// get all compound.finance markets
import fs from 'fs';

import CompoundCometAbi from '../configs/abi/compound/Comet.json';
import CompoundErc20Abi from '../configs/abi/compound/cErc20.json';
import { CompoundMarket, Compoundv3Market } from '../configs/protocols/compound';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';
import { Token } from '../types/configs';
import updateToken from './helpers/updateToken';

const CompoundMarkets: Array<string> = [
  'ethereum:0xe65cdb6479bac1e22340e4e755fae7e509ecd06c', // AAVE
  'ethereum:0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e', // BAT
  'ethereum:0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4', // COMP
  'ethereum:0x5d3a536e4d6dbd6114cc1ead35777bab948e3643', // DAI
  'ethereum:0x7713dd9ca933848f6819f38b8352d9a15ea73f67', // FEI
  'ethereum:0xface851a4921ce59e912d19329929ce6da6eb0c7', // LINK
  'ethereum:0x95b4ef2869ebd94beb4eee400a99824bf5dc325b', // MKR
  'ethereum:0x158079ee67fce2f58472a96584a73c7ab9ac95c1', // REP
  'ethereum:0xf5dce57282a584d2746faf1593d3121fcac444dc', // SAI
  'ethereum:0x4b0181102a0112a2ef11abee5563bb4a3176c9d7', // SUSHI
  'ethereum:0x12392f67bdf24fae0af363c24ac620a2f67dad86', // TUSD
  'ethereum:0x35a18000230da775cac24873d00ff85bccded550', // UNI
  'ethereum:0x39aa39c021dfbae8fac545936693ac917d5e7563', // USDC
  'ethereum:0x041171993284df560249b57358f931d9eb7b925d', // USDP
  'ethereum:0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9', // USDT
  'ethereum:0xc11b1268c1a384e55c48c2391d8d480264a3a7f4', // WBTC
  'ethereum:0xccf4429db6322d5c611ee964527d42e5d685dd6a', // WBTC 2
  'ethereum:0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946', // YFI
  'ethereum:0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407', // ZRX
];

const CompoundMarketsV3 = [
  'ethereum:0xc3d688b66703497daa19211eedff47f25384cdc3', // v3 USDC
  'ethereum:0xa17581a9e3356d9a858b789d68b4d866e593ae94', // v3 WETH
  'arbitrum:0xa5edbdd9646f8dff606d7448e414884c7d905dca', // v3 USDC.e
  'arbitrum:0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf', // v3 USDC
  'base:0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf', // v3 USDbC
  'base:0x46e6b214b524310239732d51387075e0e70970bf', // v3 WETH
  'polygon:0xf25212e676d1f7f89cd72ffee66158f541246445', // v3 USDC
];

(async function () {
  const blockchain = new BlockchainService(null);

  const protocol = 'compound';
  const allMarkets: Array<CompoundMarket> = [
    {
      protocol: 'compound',
      chain: 'ethereum',
      address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      etherPool: true,
      underlying: {
        chain: 'ethereum',
        symbol: 'ETH',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000',
      },
    },
  ];

  for (const config of CompoundMarkets) {
    const [chain, address] = config.split(':');
    const underlying = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: CompoundErc20Abi,
      method: 'underlying',
      params: [],
    });
    if (underlying) {
      const token = await blockchain.getTokenInfo({
        chain: chain,
        address: underlying.toString(),
      });

      if (token) {
        updateToken(token);
        allMarkets.push({
          protocol: protocol,
          chain,
          address: normalizeAddress(address),
          etherPool: false,
          underlying: token,
        });
        console.info(`Got market info address:${address} token:${token.symbol}`);
      }
    }
  }

  fs.writeFileSync(`./configs/data/CompoundMarkets.json`, JSON.stringify(allMarkets));

  const v3Markets: Array<Compoundv3Market> = [];
  for (const config of CompoundMarketsV3) {
    const [chain, address] = config.split(':');

    const baseTokenAddress = await blockchain.singlecall({
      chain: chain,
      target: address,
      abi: CompoundCometAbi,
      method: 'baseToken',
      params: [],
    });
    const baseToken = await blockchain.getTokenInfo({
      chain: chain,
      address: baseTokenAddress.toString(),
    });

    if (baseToken) {
      updateToken(baseToken);
      const market: Compoundv3Market = {
        chain,
        protocol,
        address: normalizeAddress(address),
        baseToken: baseToken,
        collaterals: [],
      };

      const numAssets = await blockchain.singlecall({
        chain: chain,
        target: address,
        abi: CompoundCometAbi,
        method: 'numAssets',
        params: [],
      });
      for (let i = 0; i < Number(numAssets); i++) {
        const assetInfo = await blockchain.singlecall({
          chain: chain,
          target: address,
          abi: CompoundCometAbi,
          method: 'getAssetInfo',
          params: [i],
        });
        const asset: Token | null = await blockchain.getTokenInfo({
          chain,
          address: assetInfo[1].toString(),
        });
        if (asset) {
          updateToken(asset);
          market.collaterals.push(asset);
        }
      }

      v3Markets.push(market);
      console.info(`Got market v3 info chain:${chain} address:${market.address} token:${market.baseToken.symbol}`);
    }
  }

  fs.writeFileSync(`./configs/data/CompoundMarketsV3.json`, JSON.stringify(v3Markets));
})();
