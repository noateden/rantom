import Web3 from 'web3';

import CurvePoolAbiVersion010 from '../../../configs/abi/curve/pool-0.1.0.json';
import CurvePoolAbiVersion024 from '../../../configs/abi/curve/pool-0.2.4.json';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

export type CurvePoolType =
  | 'old' // DAI, USDC, USDT, sUSD
  | 'plain' // sample: 0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7
  | 'plainWithCoinIndex' // sample: 0xd51a44d3fae010294c616388b506acda1bfaae46
  | 'plainWithoutCoinIndex' // sample: 0xdcef968d416a41cdac0ed8702fac8128a64241a2
  | 'bearing' // (AAVE bearing) tokens
  | 'meta'; // pools are paired with 3Crv pool

export interface CurvePoolInfo {
  type: CurvePoolType;
  chain: string;
  address: string;
  tokens: Array<Token>;
}

export class CurveHelper {
  public static async getPoolInfo(
    chain: string,
    totalCoins: number,
    address: string,
    type: CurvePoolType
  ): Promise<CurvePoolInfo | null> {
    const poolInfo: CurvePoolInfo = {
      type,
      chain,
      address: normalizeAddress(address),
      tokens: [],
    };

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const web3Helper = new Web3HelperProvider(null);

    // using version 0.2.4 by default
    let contract = new web3.eth.Contract(CurvePoolAbiVersion024 as any, address);

    if (type === 'old') {
      // using version 0.1.0
      contract = new web3.eth.Contract(CurvePoolAbiVersion010 as any, address);
    }

    for (let coinIndex = 0; coinIndex < totalCoins; coinIndex++) {
      const coinAddress = await contract.methods.coins(coinIndex).call();
      const token = await web3Helper.getErc20Metadata(chain, coinAddress);
      if (token) {
        poolInfo.tokens.push(token);
      } else {
        return null;
      }
    }

    return poolInfo;
  }
}
