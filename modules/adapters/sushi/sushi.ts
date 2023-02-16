import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import MasterchefAbi from '../../../configs/abi/sushi/masterchef.json';
import UniswapV2PairAbi from '../../../configs/abi/uniswap/UniswapV2Pair.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Uniswapv2Adapter } from '../uniswap/uniswapv2';

const Signatures = {
  MasterchefDeposit: '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
  MasterchefWithdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
  MasterchefEmergencyWithdraw: '0xbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae0595',
};

export class SushiAdapter extends Uniswapv2Adapter {
  public readonly name: string = 'adapter.sushi';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings[Signatures.MasterchefDeposit] = EventSignatureMapping[Signatures.MasterchefDeposit];
    this.eventMappings[Signatures.MasterchefWithdraw] = EventSignatureMapping[Signatures.MasterchefWithdraw];
    this.eventMappings[Signatures.MasterchefEmergencyWithdraw] =
      EventSignatureMapping[Signatures.MasterchefEmergencyWithdraw];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const action: TransactionAction | null = await super.tryParsingActions(options);

    if (action) {
      return action;
    }

    const { chain, address, topics, data } = options;
    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== -1 && EventSignatureMapping[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const masterchefContract = new web3.eth.Contract(MasterchefAbi as any, address);
      try {
        const poolInfo = await masterchefContract.methods.poolInfo(event.pid).call();
        const pairContract = new web3.eth.Contract(UniswapV2PairAbi as any, poolInfo.lpToken);
        const [symbol, token0Addr, token1Addr] = await Promise.all([
          pairContract.methods.symbol().call(),
          pairContract.methods.token0().call(),
          pairContract.methods.token1().call(),
        ]);

        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, token0Addr);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, token1Addr);

        if (token0 && token1) {
          const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
          const tokenSymbol = `${token0.symbol}-${token1.symbol} ${symbol}`;
          return {
            protocol: this.config.protocol,
            action: signature === Signatures.MasterchefDeposit ? 'stake' : 'unstake',
            addresses: [options.sender],
            tokens: [
              {
                chain: chain,
                symbol: tokenSymbol,
                decimals: 18,
                address: normalizeAddress(poolInfo.lpToken),
              },
            ],
            tokenAmounts: [amount],
            readableString: `${options.sender} ${
              signature === Signatures.MasterchefDeposit ? 'stake' : 'unstake'
            } ${amount} ${tokenSymbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } catch (e: any) {
        // ignore dummy pool
      }
    }

    return null;
  }
}
