import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import CurvePool024Abi from '../../../configs/abi/curve/pool-0.2.4.json';
// import CurvePool0212Abi from '../../../configs/abi/curve/pool-0.2.12.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  // vyper version 0.2.4
  TokenExchange: '0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140',
  AddLiquidity: '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
  RemoveLiquidity: '0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
  RemoveLiquidityImbalance: '0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',

  // vyper version 0.2.8
  AddLiquidityVersion028: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
  RemoveLiquidityVersion028: '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
  RemoveLiquidityImbalanceVersion028: '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',

  // vyper version 0.2.12
  TokenExchangeVersion0212: '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
  AddLiquidityVersion0212: '0x96b486485420b963edd3fdec0b0195730035600feb7de6f544383d7950fa97ee',
  RemoveLiquidityVersion0212: '0xd6cc314a0b1e3b2579f8e64248e82434072e8271290eef8ad0886709304195f5',

  // vyper version 0.3.0
  AddLiquidityVersion030: '0x540ab385f9b5d450a27404172caade516b3ba3f4be88239ac56a2ad1de2a1f5a',
  RemoveLiquidityVersion030: '0xdd3c0336a16f1b64f172b7bb0dad5b2b3c7c76f91e8c4aafd6aae60dce800153',
};

export class CurveAdapter extends Adapter {
  public readonly name: string = 'adapter.curve';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TokenExchange]: EventSignatureMapping[Signatures.TokenExchange],
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
      [Signatures.RemoveLiquidityImbalance]: EventSignatureMapping[Signatures.RemoveLiquidityImbalance],

      [Signatures.AddLiquidityVersion028]: EventSignatureMapping[Signatures.AddLiquidityVersion028],
      [Signatures.RemoveLiquidityVersion028]: EventSignatureMapping[Signatures.RemoveLiquidityVersion028],
      [Signatures.RemoveLiquidityImbalanceVersion028]:
        EventSignatureMapping[Signatures.RemoveLiquidityImbalanceVersion028],

      [Signatures.TokenExchangeVersion0212]: EventSignatureMapping[Signatures.TokenExchangeVersion0212],
      [Signatures.AddLiquidityVersion0212]: EventSignatureMapping[Signatures.AddLiquidityVersion0212],
      [Signatures.RemoveLiquidityVersion0212]: EventSignatureMapping[Signatures.RemoveLiquidityVersion0212],

      [Signatures.AddLiquidityVersion030]: EventSignatureMapping[Signatures.AddLiquidityVersion030],
      [Signatures.RemoveLiquidityVersion030]: EventSignatureMapping[Signatures.RemoveLiquidityVersion030],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      signature === Signatures.TokenExchange ||
      signature === Signatures.AddLiquidity ||
      signature === Signatures.RemoveLiquidity ||
      signature === Signatures.RemoveLiquidityImbalance ||
      signature === Signatures.AddLiquidityVersion028 ||
      signature === Signatures.RemoveLiquidityVersion028 ||
      signature === Signatures.RemoveLiquidityImbalanceVersion028 ||
      signature === Signatures.TokenExchangeVersion0212 ||
      signature === Signatures.AddLiquidityVersion0212 ||
      signature === Signatures.RemoveLiquidityVersion0212 ||
      signature === Signatures.AddLiquidityVersion030 ||
      signature === Signatures.RemoveLiquidityVersion030
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const poolContract = new web3.eth.Contract(CurvePool024Abi as any, address);

      try {
        const poolOwner = await poolContract.methods.owner().call();
        if (this.config.contracts[chain].indexOf(normalizeAddress(poolOwner)) !== -1) {
          const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

          // curve owns this pool
          switch (signature) {
            case Signatures.TokenExchange:
            case Signatures.TokenExchangeVersion0212: {
              const [soldTokenAddr, buyTokenAddr] = await Promise.all([
                poolContract.methods.coins(event.sold_id).call(),
                poolContract.methods.coins(event.bought_id).call(),
              ]);

              const token0 = await this.getWeb3Helper().getErc20Metadata(chain, soldTokenAddr);
              const token1 = await this.getWeb3Helper().getErc20Metadata(chain, buyTokenAddr);

              if (token0 && token1) {
                const buyer = normalizeAddress(event.buyer);
                const amount0 = new BigNumber(event.tokens_sold.toString())
                  .dividedBy(new BigNumber(10).pow(token0.decimals))
                  .toString(10);
                const amount1 = new BigNumber(event.tokens_bought.toString())
                  .dividedBy(new BigNumber(10).pow(token1.decimals))
                  .toString(10);

                return {
                  protocol: this.config.protocol,
                  action: 'swap',
                  addresses: [buyer],
                  tokens: [token0, token1],
                  tokenAmounts: [amount0, amount1],
                  readableString: `${buyer} swaps ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
                };
              }
              break;
            }
            case Signatures.AddLiquidity:
            case Signatures.RemoveLiquidity:
            case Signatures.RemoveLiquidityImbalance:
            case Signatures.AddLiquidityVersion028:
            case Signatures.RemoveLiquidityVersion028:
            case Signatures.RemoveLiquidityImbalanceVersion028:
            case Signatures.AddLiquidityVersion0212:
            case Signatures.RemoveLiquidityVersion0212:
            case Signatures.AddLiquidityVersion030:
            case Signatures.RemoveLiquidityVersion030: {
              const provider = normalizeAddress(event.provider);
              const tokens: Array<Token> = [];
              const amounts: Array<string> = [];
              let coinIndex = 0;
              while (true) {
                try {
                  const coinAddr = await poolContract.methods.coins(coinIndex).call();
                  const token = await this.getWeb3Helper().getErc20Metadata(chain, coinAddr);
                  if (token) {
                    tokens.push(token);
                    amounts.push(
                      new BigNumber(event.token_amounts[coinIndex])
                        .dividedBy(new BigNumber(10).pow(token.decimals))
                        .toString(10)
                    );
                  }
                } catch (e: any) {
                  // ignore when get coin failed
                  break;
                }

                coinIndex++;
              }

              let tokenAmount: string = '';
              for (let i = 0; i < tokens.length; i++) {
                tokenAmount += `, ${amounts[i]} ${tokens[i].symbol}`;
              }

              return {
                protocol: this.config.protocol,
                action:
                  signature === Signatures.AddLiquidity ||
                  signature === Signatures.AddLiquidityVersion0212 ||
                  signature === Signatures.AddLiquidityVersion028 ||
                  signature === Signatures.AddLiquidityVersion030
                    ? 'deposit'
                    : 'withdraw',
                addresses: [provider],
                tokens: tokens,
                tokenAmounts: amounts,
                readableString: `${provider} ${
                  signature === Signatures.AddLiquidity ||
                  signature === Signatures.AddLiquidityVersion0212 ||
                  signature === Signatures.AddLiquidityVersion028 ||
                  signature === Signatures.AddLiquidityVersion030
                    ? 'deposit'
                    : 'withdraw'
                } ${tokenAmount.slice(2)} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      } catch (e: any) {
        // ignore bad pool
      }
    }

    return null;
  }
}
