// index events from whitelisted pool only
// feel free to open a pull request
import UniLiquidityPools from '../data/UniLiquidityPools.json';

export const WhitelistUniPools: Array<string> = [...UniLiquidityPools.map((item) => item.address)];
