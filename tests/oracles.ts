// import { expect } from 'chai';
// import { describe } from 'mocha';
//
// import AaveReserves from '../configs/data/AaveReserves.json';
// import CompoundMarkets from '../configs/data/CompoundMarkets.json';
// import Compoundv3Markets from '../configs/data/CompoundMarketsV3.json';
// import IronbankMarkets from '../configs/data/IronbankMarkets.json';
// import { getTimestamp } from '../lib/helper';
// import { OracleProvider } from '../modules/oracles/oracle';
// import { Token } from '../types/configs';
//
// function getAllTokens(): Array<Token> {
//   const tokens: Array<Token> = [];
//
//   const found: { [key: string]: boolean } = {};
//   for (const market of CompoundMarkets.concat(IronbankMarkets)) {
//     const tokenKey = `${market.chain}:${market.underlying.address}`;
//     if (!found[tokenKey]) {
//       tokens.push(market.underlying);
//       found[tokenKey] = true;
//     }
//   }
//
//   for (const market of Compoundv3Markets) {
//     const baseTokenKey = `${market.baseToken.chain}:${market.baseToken.address}`;
//     if (!found[baseTokenKey]) {
//       tokens.push(market.baseToken);
//       found[baseTokenKey] = true;
//     }
//
//     for (const collateral of market.collaterals) {
//       const collateralTokenKey = `${collateral.chain}:${collateral.address}`;
//       if (!found[collateralTokenKey]) {
//         tokens.push(collateral);
//         found[collateralTokenKey] = true;
//       }
//     }
//   }
//
//   for (const reserve of AaveReserves) {
//     const tokenKey = `${reserve.chain}:${reserve.address}`;
//     if (!found[tokenKey]) {
//       tokens.push(reserve);
//       found[tokenKey] = true;
//     }
//   }
//
//   return tokens;
// }
//
// const tokens = getAllTokens();
// const oracle = new OracleProvider(null);
//
// describe('oracles', async function () {
//   tokens.map((token) =>
//     it(`can get token price ${token.symbol}:${token.address}`, async function () {
//       const result = await oracle.getTokenSpotPriceUsd({
//         chain: token.chain,
//         address: token.address,
//         timestamp: getTimestamp(),
//       });
//
//       expect(Number(result ? result.spotPriceUsd : 0)).greaterThan(0);
//     })
//   );
// });
