import Web3 from 'web3';

import ConfigStorageAbi from '../../../configs/abi/hmx/ConfigStorage.json';
import EnvConfig from '../../../configs/envConfig';
import { Web3HelperProvider } from '../../../services/web3';
import { Token } from '../../../types/configs';

interface HmxPerpetualMarket {
  id: number;
  token: Token;
}

export class HmxHelper {
  public static async getAllMarkets(
    chain: string,
    tradeServiceConfigStorage: string
  ): Promise<Array<HmxPerpetualMarket>> {
    const markets: Array<HmxPerpetualMarket> = [];

    const web3Helper = new Web3HelperProvider(null);
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const contract = new web3.eth.Contract(ConfigStorageAbi as any, tradeServiceConfigStorage);

    const marketConfigsLength = await contract.methods.getMarketConfigsLength().call();
    for (let i = 0; i < Number(marketConfigsLength); i++) {
      const marketConfig: any = await contract.methods.marketConfigs(i).call();
      const assetConfig: any = await contract.methods.getAssetConfig(marketConfig.assetId).call();

      const token = await web3Helper.getErc20Metadata(chain, assetConfig[0].toString());
      if (token) {
        console.log(`got market id:${i} token:${token.symbol}:${token.address}`);

        markets.push({
          id: i,
          token: token,
        });
      } else {
        console.log(`failed to get market token id:${i}`);
        console.log(`assetId ${marketConfig.assetId}`);
        console.log(`token ${assetConfig[0]}`);
      }
    }

    return markets;
  }
}
