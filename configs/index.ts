import { Token } from '../types/configs';
import TokenListArbitrum from './tokenlists/arbitrum.json';
import TokenListAvalanche from './tokenlists/avalanche.json';
import TokenListBase from './tokenlists/base.json';
import TokenListBnbchain from './tokenlists/bnbchain.json';
import TokenListCelo from './tokenlists/celo.json';
import TokenListEthereum from './tokenlists/ethereum.json';
import TokenListFantom from './tokenlists/fantom.json';
import TokenListLinea from './tokenlists/linea.json';
import TokenListOptimism from './tokenlists/optimism.json';
import TokenListPolygon from './tokenlists/polygon.json';
import TokenListPolygonzkevm from './tokenlists/polygonzkevm.json';
import TokenListZksyncera from './tokenlists/zksyncera.json';

export const TokenList: {
  [key: string]: {
    [key: string]: Token;
  };
} = {
  ethereum: TokenListEthereum,
  arbitrum: TokenListArbitrum,
  base: TokenListBase,
  optimism: TokenListOptimism,
  polygon: TokenListPolygon,
  bnbchain: TokenListBnbchain,
  avalanche: TokenListAvalanche,
  fantom: TokenListFantom,
  linea: TokenListLinea,
  zksyncera: TokenListZksyncera,
  polygonzkevm: TokenListPolygonzkevm,
  celo: TokenListCelo,
};

export const DefaultQueryLogsBlockRange = 50;
export const DefaultQueryLogsBlockRangeSingleContract = 5000;

// chain => ethereum
export const DefaultQueryLogsRanges: { [key: string]: number } = {
  polygon: 50,
  linea: 50,
  zksyncera: 20,
};

// we save latest parsed transactions into database for fast query
// this value is the number of seconds of the caching
export const DefaultParserCachingTime = 5 * 60;

// api server
export const DefaultQueryResultLimit = 200;
