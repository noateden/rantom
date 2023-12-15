// get static data of Yearn vaults
import axios from 'axios';
import fs from 'fs';

import YearnStableSwapPoolAbi from '../configs/abi/yearn/YearnStableswapPool.json';
import { AddressZero } from '../configs/constants/addresses';
import { compareAddress, normalizeAddress } from '../lib/utils';
import YearnLibs from '../modules/adapters/yearn/libs';
import BlockchainService from '../services/blockchains/blockchain';
import { LiquidityPoolConstant, StakingPoolConstant } from '../types/domains';
import updateToken from './helpers/updateToken';

const YearnExporterEndpoints = [
  'ethereum:::https://api.yexporter.io/v1/chains/1/vaults/all',
  'arbitrum:::https://api.yexporter.io/v1/chains/42161/vaults/all',
  'optimism:::https://api.yexporter.io/v1/chains/10/vaults/all',
  'base:::https://api.yexporter.io/v1/chains/8453/vaults/all',
  'fantom:::https://api.yexporter.io/v1/chains/250/vaults/all',
];

const YearnyethLiquidityPool = '0x2cced4ffa804adbe1269cdfc22d7904471abde63';

// const YearnV3Vaults: Array<string> = [
//   'polygon:0xA013Fbd4b711f9ded6fB09C1c0d358E2FbC2EAA0',
//   'polygon:0x28F53bA70E5c8ce8D03b1FaD41E9dF11Bb646c36',
//   'polygon:0x305F25377d0a39091e99B975558b1bdfC3975654',
//   'polygon:0xdB92B89Ca415c0dab40Dc96E99Fc411C08F20780',
//   'polygon:0xb1403908F772E4374BB151F7C67E88761a0Eb4f1',
//   'polygon:0x7486325A843590b84c98563c6962C58655569EcA',
//   'polygon:0xBEDA9A5300393e00229dc15cC54D5185E7646c56',
//   'polygon:0x12c3Ad898e8eB1C0ec0Bb74f9748F36C46593F68',
//   'polygon:0x2a42A69F48EfffDF2d4Fb079Af60D98D3e34D49C',
//   'polygon:0x5136c2F7aB13E202eD42bc1AE82Dd63475919653',
// ];

(async function () {
  const blockchain = new BlockchainService(null);

  const yearnyethLiquidityPool: LiquidityPoolConstant = {
    protocol: 'yearnyeth',
    chain: 'ethereum',
    version: 'stableswap',
    factory: AddressZero,
    address: normalizeAddress(YearnyethLiquidityPool),
    tokens: [],
  };

  // get yearn yETH assets from liquidity pool
  const numAsset = await blockchain.singlecall({
    chain: 'ethereum',
    abi: YearnStableSwapPoolAbi,
    target: YearnyethLiquidityPool,
    method: 'num_assets',
    params: [],
  });
  for (let poolId = 0; poolId < Number(numAsset); poolId++) {
    const asset = await blockchain.singlecall({
      chain: 'ethereum',
      abi: YearnStableSwapPoolAbi,
      target: YearnyethLiquidityPool,
      method: 'assets',
      params: [poolId],
    });
    const token = await blockchain.getTokenInfo({
      chain: 'ethereum',
      address: asset,
    });
    if (token) {
      updateToken(token);

      yearnyethLiquidityPool.tokens.push(token);
      console.log(`Got yearnyeth liquidity pool asset ${poolId} ${token.symbol}`);
    }
  }

  fs.writeFileSync('./configs/data/YearnyethLiquidityPools.json', JSON.stringify([yearnyethLiquidityPool]));

  const stakingPoolFilePath = './configs/data/YearnVaults.json';
  for (const config of YearnExporterEndpoints) {
    let existedVaults: Array<StakingPoolConstant> = [];
    if (fs.existsSync(stakingPoolFilePath)) {
      existedVaults = JSON.parse(fs.readFileSync(stakingPoolFilePath).toString());
    }
    const [chain, endpoint] = config.split(':::');
    const response = await axios.get(endpoint);

    const vaults: Array<any> = (response.data as Array<any>).filter((item: any) => item.type === 'v2');

    for (const vault of vaults) {
      if (
        existedVaults.filter((item) => item.chain === chain && compareAddress(item.address, vault.address)).length === 0
      ) {
        const vaultInfo = await YearnLibs.getVaultInfo({
          services: null,
          chain: chain,
          protocol: 'yearn',
          address: vault.address,
        });
        if (vaultInfo) {
          updateToken(vaultInfo.token);

          existedVaults.push(vaultInfo);
          fs.writeFileSync(stakingPoolFilePath, JSON.stringify(existedVaults));

          console.log(`Got yearn vault ${chain} ${vault.address} ${vaultInfo.token.symbol}`);
        }
      }
    }
  }
})();
