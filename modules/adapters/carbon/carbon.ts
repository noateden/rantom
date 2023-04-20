import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  TokensTraded: '0x95f3b01351225fea0e69a46f68b164c9dea10284f12cd4a907ce66510ab7af6a',
  StrategyCreated: '0xff24554f8ccfe540435cfc8854831f8dcf1cf2068708cfaf46e8b52a4ccc4c8d',
  StrategyDeleted: '0x4d5b6e0627ea711d8e9312b6ba56f50e0b51d41816fd6fd38643495ac81d38b6',
};

export class CarbonAdapter extends Adapter {
  public readonly name: string = 'adapter.carbon';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TokensTraded]: EventSignatureMapping[Signatures.TokensTraded],
      [Signatures.StrategyCreated]: EventSignatureMapping[Signatures.StrategyCreated],
      [Signatures.StrategyDeleted]: EventSignatureMapping[Signatures.StrategyDeleted],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.TokensTraded) {
        const sourceToken = await this.getWeb3Helper().getErc20Metadata(chain, event.sourceToken);
        const targetToken = await this.getWeb3Helper().getErc20Metadata(chain, event.targetToken);

        if (sourceToken && targetToken) {
          const trader = normalizeAddress(event.trader);
          const sourceAmount = new BigNumber(event.sourceAmount)
            .dividedBy(new BigNumber(10).pow(sourceToken.decimals))
            .toString(10);
          const targetAmount = new BigNumber(event.targetAmount)
            .dividedBy(new BigNumber(10).pow(targetToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'swap',
            addresses: [trader],
            tokens: [sourceToken, targetToken],
            tokenAmounts: [sourceAmount, targetAmount],
            readableString: `${trader} swap ${sourceAmount} ${sourceToken.symbol} for ${targetAmount} ${targetToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.StrategyCreated || signature === Signatures.StrategyDeleted) {
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.token0);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.token1);

        if (token0 && token1) {
          const amount0 = new BigNumber((event.order0 as any).y.toString())
            .dividedBy(new BigNumber(10).pow(token0.decimals))
            .toString(10);
          const amount1 = new BigNumber((event.order1 as any).y.toString())
            .dividedBy(new BigNumber(10).pow(token1.decimals))
            .toString(10);
          const user = normalizeAddress(event.owner);
          const action: KnownAction = signature === Signatures.StrategyCreated ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [user],
            tokens: [token0, token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${user} ${action} ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
