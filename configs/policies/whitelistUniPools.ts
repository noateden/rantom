// index events from whitelisted pool only
// feel free to open a pull request
import UniLiquidityPools from '../data/UniLiquidityPools.json';

export const WhitelistUniPools: Array<string> = [
  ...UniLiquidityPools.filter((item) => item.protocol === 'uniswapv2' || item.protocol === 'uniswapv3').map(
    (item) => item.address
  ),
];

export const WhitelistSushiPools: Array<string> = [
  ...UniLiquidityPools.filter((item) => item.protocol === 'sushi' || item.protocol === 'sushiv3').map(
    (item) => item.address
  ),
];

export const WhitelistPancakePools: Array<string> = [
  ...UniLiquidityPools.filter((item) => item.protocol === 'pancakeswap' || item.protocol === 'pancakeswapv3').map(
    (item) => item.address
  ),
];
