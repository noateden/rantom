import Web3 from 'web3';

import DmFactoryAbi from '../../../configs/abi/kyberswap/DMMFactory.json';
import KsFactoryAbi from '../../../configs/abi/kyberswap/KSFactory.json';
import { AddressZero } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';

export class KyberHelper {
  public static async getKyberswapClassicPool(chain: string, token0: string, token1: string): Promise<string> {
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const ksFactory = new web3.eth.Contract(KsFactoryAbi as any, '0x1c758af0688502e49140230f6b0ebd376d429be5');
    const dmFactory = new web3.eth.Contract(DmFactoryAbi as any, '0x833e4083b7ae46cea85695c4f7ed25cdad8886de');

    let pools = await ksFactory.methods.getPools(token0, token1).call();
    if (pools.length === 0) {
      pools = await dmFactory.methods.getPools(token0, token1).call();
    }
    if (pools.length > 0) {
      return normalizeAddress(pools[0]);
    }

    return AddressZero;
  }
}
