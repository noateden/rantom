import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';
import { Gmxv2Mappings } from './abis';

export interface Gmxv2MarketInfo {
  chain: string;
  address: string;
  indexToken: Token;
  longToken: Token;
  shortToken: Token;
}

export class GmxHelper {
  public static async getGmxV2MarketFromEventLog1(chain: string, rawLog: any): Promise<Gmxv2MarketInfo | null> {
    const web3Helper = new Web3HelperProvider(null);

    const signature = rawLog.topics[0];
    if (signature === '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160') {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(Gmxv2Mappings[signature].abi, rawLog.data, rawLog.topics.slice(1));

      const eventData: any = event.eventData;
      if (event.eventName === 'MarketCreated') {
        const indexToken = await web3Helper.getErc20Metadata(chain, eventData.addressItems[0][1].value);
        const longToken = await web3Helper.getErc20Metadata(chain, eventData.addressItems[0][2].value);
        const shortToken = await web3Helper.getErc20Metadata(chain, eventData.addressItems[0][3].value);

        if (indexToken && longToken && shortToken) {
          return {
            chain,
            address: normalizeAddress(eventData.addressItems[0][0].value),
            indexToken,
            longToken,
            shortToken,
          };
        }
      }
    }

    return null;
  }
}
