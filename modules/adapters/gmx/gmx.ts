import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  BuyUSDG: '0xab4c77c74cd32c85f35416cf03e7ce9e2d4387f7b7f2c1f4bf53daaecf8ea72d',
  SellUSDG: '0xd732b7828fa6cee72c285eac756fc66a7477e3dc22e22e7c432f1c265d40b483',
  Swap: '0x0874b2d545cb271cdbda4e093020c452328b24af12382ed62c4d00f5c26709db',
  IncreasePosition: '0x2fe68525253654c21998f35787a8d0f361905ef647c854092430ab65f2f15022',
  DecreasePosition: '0x93d75d64d1f84fc6f430a64fc578bdd4c1e090e90ea2d51773e626d19de56d30',
  LiquidatePosition: '0x2e1f85a64a2f22cf2f0c42584e7c919ed4abe8d53675cff0f62bf1e95a1c676f',

  // detect stake and unstake GMX
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  Claim: '0x47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4',
};

export class GmxAdapter extends Adapter {
  public readonly name: string = 'adapter.chai';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.BuyUSDG]: EventSignatureMapping[Signatures.BuyUSDG],
      [Signatures.SellUSDG]: EventSignatureMapping[Signatures.SellUSDG],
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.IncreasePosition]: EventSignatureMapping[Signatures.IncreasePosition],
      [Signatures.DecreasePosition]: EventSignatureMapping[Signatures.DecreasePosition],
      [Signatures.LiquidatePosition]: EventSignatureMapping[Signatures.LiquidatePosition],
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
      [Signatures.Claim]: EventSignatureMapping[Signatures.Claim],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.BuyUSDG || signature === Signatures.SellUSDG) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.tokenAmount.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString();
          const action: KnownAction = signature === Signatures.BuyUSDG ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.Swap) {
        const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenIn);
        const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.tokenOut);
        if (token0 && token1) {
          const account = normalizeAddress(event.account);
          const amount0 = new BigNumber(event.amountIn.toString())
            .dividedBy(new BigNumber(10).pow(token0.decimals))
            .toString(10);
          const amount1 = new BigNumber(event.amountOutAfterFees.toString())
            .dividedBy(new BigNumber(10).pow(token1.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'swap',
            addresses: [account],
            tokens: [token0, token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${account} swap ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.IncreasePosition || signature === Signatures.DecreasePosition) {
        const collateralToken = await this.getWeb3Helper().getErc20Metadata(chain, event.collateralToken);
        const indexToken = await this.getWeb3Helper().getErc20Metadata(chain, event.indexToken);
        if (collateralToken && indexToken) {
          const action: KnownAction =
            signature === Signatures.IncreasePosition ? 'increaseLeverage' : 'decreaseLeverage';
          const account = normalizeAddress(event.account);
          const collateralDelta = new BigNumber(event.collateralDelta.toString())
            .dividedBy(new BigNumber(10).pow(collateralToken.decimals))
            .toString(10);
          const sizeDelta = new BigNumber(event.sizeDelta.toString())
            .dividedBy(new BigNumber(10).pow(indexToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [collateralToken, indexToken],
            tokenAmounts: [collateralDelta, sizeDelta],
            readableString: `${account} ${action} ${collateralDelta} ${collateralToken.symbol} size ${sizeDelta} ${indexToken.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              leverageAction: event.isLong ? 'long' : 'short',
            },
          };
        }
      } else if (signature === Signatures.LiquidatePosition) {
        const collateralToken = await this.getWeb3Helper().getErc20Metadata(chain, event.collateralToken);
        const indexToken = await this.getWeb3Helper().getErc20Metadata(chain, event.indexToken);
        if (collateralToken && indexToken) {
          const account = normalizeAddress(event.account);
          const collateralDelta = new BigNumber(event.collateral.toString())
            .dividedBy(new BigNumber(10).pow(collateralToken.decimals))
            .toString(10);
          const sizeDelta = new BigNumber(event.size.toString())
            .dividedBy(new BigNumber(10).pow(indexToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'liquidate',
            addresses: [account],
            tokens: [collateralToken, indexToken],
            tokenAmounts: [collateralDelta, sizeDelta],
            readableString: `${account} liquidate ${collateralDelta} ${collateralToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.Transfer) {
        // stake/unstake GMX
        if (compareAddress(event.from, AddressZero) || compareAddress(event.to, AddressZero)) {
          const token = Tokens.arbitrum.GMX;
          const action: KnownAction = compareAddress(event.from, AddressZero) ? 'deposit' : 'withdraw';
          const account = action === 'deposit' ? normalizeAddress(event.to) : normalizeAddress(event.from);
          const amount = new BigNumber(event.value.toString()).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.Claim) {
        const token = Tokens.arbitrum.WETH;
        const account = normalizeAddress(event.receiver);
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'collect',
          addresses: [account],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${account} collect ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
