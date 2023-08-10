import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  OpenPosition: '0xdb27855d3e94a6c985e1e59c77870a73484ef3c40d29fbfe14bb3e686da86efb',
  ClosePosition: '0x645156066afee3ede009256908a9e96538cc1ad681c46b10114f6ce98ebd0600',
  Liquidate: '0xd63e21d9ddaf46f8d28d121f06e7ed33fcc0300af1f8c794e69056dbf37e2d6a',
  AddLiquidity: '0x4b834bda1e32273014eaae217dcc631b391d25d7d056066e2f008aecd86083e8',
  RemoveLiquidity: '0xd20afc5b5a4edaae7399b3eb4737f26d8688e6a86e1b525ffbe063574583b1aa',
};

export class MuxAdapter extends Adapter {
  public readonly name: string = 'adapter.mux';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.OpenPosition]: EventSignatureMapping[Signatures.OpenPosition],
      [Signatures.ClosePosition]: EventSignatureMapping[Signatures.ClosePosition],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (
        signature === Signatures.OpenPosition ||
        signature === Signatures.ClosePosition ||
        signature === Signatures.Liquidate
      ) {
        const args = event.args as any;
        const assetId = Number(event.assetId);

        let token: Token | null = null;
        let collateral: Token | null = null;
        for (const asset of this.config.staticData.assets) {
          if (asset.assetId === assetId && asset.chain === chain) {
            token = asset.token;
          }
          if (asset.assetId === Number(args.collateralId) && asset.chain === chain) {
            collateral = asset.token;
          }
        }

        if (token && collateral) {
          const trader = normalizeAddress(event.trader);

          const amount = new BigNumber(args.amount.toString())
            .multipliedBy(new BigNumber(args.assetPrice.toString()))
            .dividedBy(1e36)
            .toString(10);

          let action: KnownAction;
          if (signature === Signatures.OpenPosition) {
            if (args.isLong) {
              action = 'increaseLong';
            } else {
              action = 'increaseShort';
            }
          } else if (signature === Signatures.ClosePosition) {
            if (args.isLong) {
              action = 'decreaseLong';
            } else {
              action = 'decreaseShort';
            }
          } else {
            if (args.isLong) {
              action = 'liquidateLong';
            } else {
              action = 'liquidateShort';
            }
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [trader],
            tokens: [collateral, token],
            tokenAmounts: [],
            usdAmounts: [amount],
            readableString: `${trader} ${action} ${token.symbol} size $${amount} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.AddLiquidity || signature === Signatures.RemoveLiquidity) {
        const tokenId = Number(event.tokenId);

        let token: Token | null = null;
        for (const asset of this.config.staticData.assets) {
          if (asset.assetId === tokenId && asset.chain === chain) {
            token = asset.token;
          }
        }

        if (token) {
          const trader = normalizeAddress(event.trader);

          // TokenAmount = mlpPrice * mlpAmount / tokenPrice
          const amount = new BigNumber(event.mlpPrice.toString())
            .multipliedBy(new BigNumber(event.mlpAmount.toString()))
            .dividedBy(new BigNumber(event.tokenPrice))
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          const action: KnownAction = signature === Signatures.AddLiquidity ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [trader],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${trader} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
