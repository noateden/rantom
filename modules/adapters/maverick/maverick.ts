import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { MaverickPoolInfo } from './helper';

const Signatures = {
  Swap: '0x3b841dc9ab51e3104bda4f61b41e4271192d22cd19da5ee6e292dc8e2744f713',
  AddLiquidity: '0x133a027327582be2089f6ca47137e3d337be4ca2cd921e5f0b178c9c2d5b8364',
  RemoveLiquidity: '0x65da280c1e973a1c5884c38d63e2c2b3c2a3158a0761e76545b64035e2489dfe',
};

export class MaverickAdapter extends Adapter {
  public readonly name: string = 'adapter.maverick';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let poolInfo: MaverickPoolInfo | null = null;
      for (const pool of this.config.staticData.pools) {
        if (compareAddress(address, pool.address)) {
          poolInfo = pool;
        }
      }

      if (poolInfo) {
        if (signature === Signatures.Swap) {
          const token0 = Boolean(event.tokenAIn) ? poolInfo.tokenA : poolInfo.tokenB;
          const token1 = Boolean(event.tokenAIn) ? poolInfo.tokenB : poolInfo.tokenA;

          if (token0 && token1) {
            const sender = normalizeAddress(event.sender);
            const recipient = normalizeAddress(event.recipient);
            const amount0 = new BigNumber(event.amountIn)
              .dividedBy(new BigNumber(10).pow(token0.decimals))
              .toString(10);
            const amount1 = new BigNumber(event.amountOut)
              .dividedBy(new BigNumber(10).pow(token1.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [sender, recipient],
              tokens: [token0, token1],
              tokenAmounts: [amount0, amount1],
              readableString: `${sender} swap ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } else {
          let amountA = new BigNumber(0);
          let amountB = new BigNumber(0);
          const binDeltas = event.binDeltas as unknown as Array<any>;
          for (const binDelta of binDeltas) {
            amountA = amountA.plus(
              new BigNumber(binDelta.deltaA.toString()).dividedBy(1e18)
            );
            amountB = amountB.plus(
              new BigNumber(binDelta.deltaB.toString()).dividedBy(1e18)
            );
          }

          const sender = normalizeAddress(event.sender);
          const action: KnownAction = signature === Signatures.AddLiquidity ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [sender],
            tokens: [poolInfo.tokenA, poolInfo.tokenB],
            tokenAmounts: [amountA.toString(10), amountB.toString(10)],
            readableString: `${sender} ${action} liquidity on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
