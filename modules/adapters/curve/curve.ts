import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { CurvePoolInfo } from './helper';

const Signatures = {
  // veCRV
  Deposit: '0x4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d59',
  Withdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',

  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  TokenExchangeUnderlying: '0xd013ca23e77a65003c2c659c5442c00c805371b7fc1ebd4c206c41d1536bd90b',

  // vyper version 0.1.0
  AddLiquidityVersion010: '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
  RemoveLiquidityVersion010: '0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
  RemoveLiquidityImbalance010: '0xb964b72f73f5ef5bf0fdc559b2fab9a7b12a39e47817a547f1f0aee47febd602',

  // vyper version 0.2.4
  TokenExchange: '0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140',
  AddLiquidity: '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
  RemoveLiquidity: '0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
  RemoveLiquidityOne: '0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
  RemoveLiquidityImbalance: '0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',

  AddLiquidityVersion028: '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
  RemoveLiquidityVersion028: '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
  RemoveLiquidityImbalanceVersion028: '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',

  // vyper version 0.2.12
  TokenExchangeVersion0212: '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
  AddLiquidityVersion0212: '0x96b486485420b963edd3fdec0b0195730035600feb7de6f544383d7950fa97ee',
  RemoveLiquidityVersion0212: '0xd6cc314a0b1e3b2579f8e64248e82434072e8271290eef8ad0886709304195f5',
  RemoveLiquidityOneVersion0212: '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0',

  // vyper version 0.3.0
  AddLiquidityVersion030: '0x540ab385f9b5d450a27404172caade516b3ba3f4be88239ac56a2ad1de2a1f5a',
  RemoveLiquidityVersion030: '0xdd3c0336a16f1b64f172b7bb0dad5b2b3c7c76f91e8c4aafd6aae60dce800153',
};

export class CurveAdapter extends Adapter {
  public readonly name: string = 'adapter.curve';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: config.customEventMapping
        ? config.customEventMapping[Signatures.Withdraw]
        : EventSignatureMapping[Signatures.Withdraw],

      [Signatures.TokenExchangeUnderlying]: EventSignatureMapping[Signatures.TokenExchangeUnderlying],

      [Signatures.AddLiquidityVersion010]: EventSignatureMapping[Signatures.AddLiquidityVersion010],
      [Signatures.RemoveLiquidityVersion010]: EventSignatureMapping[Signatures.RemoveLiquidityVersion010],
      [Signatures.RemoveLiquidityImbalance010]: EventSignatureMapping[Signatures.RemoveLiquidityImbalance010],

      [Signatures.TokenExchange]: EventSignatureMapping[Signatures.TokenExchange],
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
      [Signatures.RemoveLiquidityOne]: EventSignatureMapping[Signatures.RemoveLiquidityOne],
      [Signatures.RemoveLiquidityImbalance]: EventSignatureMapping[Signatures.RemoveLiquidityImbalance],

      [Signatures.AddLiquidityVersion028]: EventSignatureMapping[Signatures.AddLiquidityVersion028],
      [Signatures.RemoveLiquidityVersion028]: EventSignatureMapping[Signatures.RemoveLiquidityVersion028],
      [Signatures.RemoveLiquidityImbalanceVersion028]:
        EventSignatureMapping[Signatures.RemoveLiquidityImbalanceVersion028],

      [Signatures.TokenExchangeVersion0212]: EventSignatureMapping[Signatures.TokenExchangeVersion0212],
      [Signatures.AddLiquidityVersion0212]: EventSignatureMapping[Signatures.AddLiquidityVersion0212],
      [Signatures.RemoveLiquidityVersion0212]: EventSignatureMapping[Signatures.RemoveLiquidityVersion0212],
      [Signatures.RemoveLiquidityOneVersion0212]: EventSignatureMapping[Signatures.RemoveLiquidityOneVersion0212],

      [Signatures.AddLiquidityVersion030]: EventSignatureMapping[Signatures.AddLiquidityVersion030],
      [Signatures.RemoveLiquidityVersion030]: EventSignatureMapping[Signatures.RemoveLiquidityVersion030],
    });
  }

  private getPoolConfig(poolAddress: string): CurvePoolInfo | null {
    if (this.config.staticData && this.config.staticData.pools) {
      for (const pool of this.config.staticData.pools) {
        if (compareAddress((pool as CurvePoolInfo).address, poolAddress)) {
          return pool as CurvePoolInfo;
        }
      }
    }

    return null;
  }

  private async parseNormalPoolEvent(
    chain: string,
    address: string,
    signature: string,
    poolConfig: CurvePoolInfo,
    event: any,
    options: AdapterParseLogOptions
  ): Promise<TransactionAction | null> {
    switch (signature) {
      case Signatures.TokenExchange:
      case Signatures.TokenExchangeUnderlying:
      case Signatures.TokenExchangeVersion0212: {
        let token0;
        let token1;

        if (signature === Signatures.TokenExchangeUnderlying) {
          if (poolConfig.type === 'meta' && this.config.staticData) {
            const underlyingTokens = [
              poolConfig.tokens[0],
              ...this.config.staticData.lpTokenMaps[poolConfig.tokens[1].address].tokens,
            ];
            token0 = underlyingTokens[Number(event.sold_id)];
            token1 = underlyingTokens[Number(event.bought_id)];
          } else if (poolConfig.type === 'bearing' && this.config.staticData) {
            const underlyingTokens = poolConfig.tokens.map(
              (item) => this.config.staticData.lpTokenMaps[item.address] as Token
            );
            token0 = underlyingTokens[Number(event.sold_id)];
            token1 = underlyingTokens[Number(event.bought_id)];
          } else if (poolConfig.type === 'old') {
            token0 = poolConfig.tokens[Number(event.sold_id)];
            token1 = poolConfig.tokens[Number(event.bought_id)];
          }
        } else {
          token0 = poolConfig.tokens[Number(event.sold_id)];
          token1 = poolConfig.tokens[Number(event.bought_id)];
        }

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
      case Signatures.RemoveLiquidityOne:
      case Signatures.RemoveLiquidityOneVersion0212: {
        let token: Token | null = null;
        let coinAmount = new BigNumber(0);

        // so, we try to look which token is removing by searching for token transfer event
        // curve.fi developers please stop these!!!

        // another complicated thing from curve devs
        // 3Crypto pool return coin_index on RemoveLiquidityOne event
        // other pools return coin_amount in them same signature
        // WTF devs? Can you do something?
        // https://etherscan.io/address/0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511#code
        // https://etherscan.io/address/0xdcef968d416a41cdac0ed8702fac8128a64241a2#code
        // look at these contracts, the RemoveLiquidityOne event
        // they have the same signature but diff params
        if (poolConfig.type === 'plain') {
          coinAmount = new BigNumber(event.coin_amount);
        } else if (poolConfig.type === 'plainWithCoinIndex') {
          token = poolConfig.tokens[Number(event.coin_index)];
          coinAmount = new BigNumber(event.coin_amount);
        } else if (poolConfig.type === 'plainWithoutCoinIndex') {
          // by default, we parsed event using ABI from plainWithCoinIndex
          // so, the coin_index param is actually the coin_amount on plainWithoutCoinIndex pool
          coinAmount = new BigNumber(event.coin_index);
        } else if (poolConfig.type === 'meta') {
          coinAmount = new BigNumber(event.coin_index);
        } else if (poolConfig.type === 'bearing') {
          coinAmount = new BigNumber(event.coin_amount);
        }

        if (!token) {
          if (options.context) {
            const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
            for (const log of options.context.logs) {
              if (log.topics[0] === Signatures.Transfer) {
                if (poolConfig.tokens.map((item) => item.address).indexOf(normalizeAddress(log.address)) !== -1) {
                  const transferEvent = web3.eth.abi.decodeLog(
                    EventSignatureMapping[log.topics[0]].abi,
                    log.data,
                    log.topics.slice(1)
                  );
                  const value = new BigNumber(transferEvent.value.toString());
                  if (coinAmount.eq(value)) {
                    token = await this.getWeb3Helper().getErc20Metadata(chain, log.address);
                  }
                }
              }
            }
          }

          if (token && poolConfig.type === 'bearing') {
            token = this.config.staticData.lpTokenMaps[token.address]
              ? this.config.staticData.lpTokenMaps[token.address]
              : token;
          }

          // if we cannot find any token from logs
          // yeah, it's native ETH
          if (!token) {
            token = Tokens.ethereum.NativeCoin;
          }
        }

        if (token) {
          const provider = normalizeAddress(event.provider);
          const amount = coinAmount.dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

          return {
            protocol: this.config.protocol,
            action: 'withdraw',
            addresses: [provider],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${provider} withdraw ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
        break;
      }

      case Signatures.RemoveLiquidityImbalance010: {
        const provider = normalizeAddress(event.provider);
        const tokenAmounts: Array<string> = [];
        for (let i = 0; i < poolConfig.tokens.length; i++) {
          tokenAmounts.push(
            new BigNumber(event.token_amounts[i].toString())
              .dividedBy(new BigNumber(10).pow(poolConfig.tokens[i].decimals))
              .toString(10)
          );
        }

        return {
          protocol: this.config.protocol,
          action: 'withdraw',
          addresses: [provider],
          tokens: poolConfig.tokens,
          tokenAmounts: tokenAmounts,
          readableString: `${provider} withdraw tokens on ${this.config.protocol} chain ${chain}`,
        };
      }

      case Signatures.AddLiquidity:
      case Signatures.AddLiquidityVersion010:
      case Signatures.AddLiquidityVersion028:
      case Signatures.AddLiquidityVersion0212:
      case Signatures.AddLiquidityVersion030:
      case Signatures.RemoveLiquidity:
      case Signatures.RemoveLiquidityVersion010:
      case Signatures.RemoveLiquidityVersion028:
      case Signatures.RemoveLiquidityVersion0212:
      case Signatures.RemoveLiquidityVersion030:
      case Signatures.RemoveLiquidityImbalance:
      case Signatures.RemoveLiquidityImbalanceVersion028: {
        const provider = normalizeAddress(event.provider);
        let tokens: Array<Token> = poolConfig.tokens;

        if (poolConfig.type === 'bearing') {
          tokens = poolConfig.tokens.map((item) => this.config.staticData.lpTokenMaps[item.address]);
        }

        const amounts: Array<string> = poolConfig.tokens.map((item, index) => {
          return new BigNumber(event.token_amounts[index]).dividedBy(new BigNumber(10).pow(item.decimals)).toString(10);
        });

        let tokenAmount: string = '';
        for (let i = 0; i < tokens.length; i++) {
          tokenAmount += `, ${amounts[i]} ${tokens[i].symbol}`;
        }

        let action: KnownAction = 'withdraw';
        if (
          [
            Signatures.AddLiquidity,
            Signatures.AddLiquidityVersion028,
            Signatures.AddLiquidityVersion0212,
            Signatures.AddLiquidityVersion030,
            Signatures.AddLiquidityVersion010,
          ].indexOf(signature) !== -1
        ) {
          action = 'deposit';
        }

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [provider],
          tokens: tokens,
          tokenAmounts: amounts,
          readableString: `${provider} ${action} ${tokenAmount.slice(2)} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];
    const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

    if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
      if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
        const provider = normalizeAddress(event.provider);
        const token = Tokens.ethereum.CRV;
        const amount = new BigNumber(event.value.toString()).dividedBy(1e18).toString(10);
        const action: KnownAction = signature === Signatures.Deposit ? 'lock' : 'unlock';

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [provider],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${provider} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          addition:
            signature === Signatures.Deposit
              ? {
                  lockUntil: Number(event.locktime),
                }
              : undefined,
        };
      }
    } else {
      const poolConfig = this.getPoolConfig(address);

      // support configured pools
      if (poolConfig) {
        return await this.parseNormalPoolEvent(chain, address, signature, poolConfig, event, options);
      }
    }

    return null;
  }
}
