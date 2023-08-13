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
  AddLiquidity: '0x38dc38b96482be64113daffd8d464ebda93e856b70ccfc605e69ccf892ab981e',
  RemoveLiquidity: '0x87b9679bb9a4944bafa98c267e7cd4a00ab29fed48afdefae25f0fca5da27940',
  CollectAddLiquidityFee: '0x679774f179c892530fe3dc723b7f34a85f1ff88c607e4aa0efb842d846c9b017',
  CollectRemoveLiquidityFee: '0x8f924d7feb4dab4caf9b453296a6f4f826801a1decbc6f9c3d080947511c0385',
  LogDepositCollateral: '0x2f5b85fe8d9b983096143251707f847598823cf6bdaa0765cb22016f89c16707',
  LogWithdrawCollateral: '0xd2227e3b979e395b897a2e140dfab95c5e1a8187da33a3f5d149791aecc3c3d5',
  LogIncreasePosition: '0x42371c9e0209a6156bffa0a0885b6e267ebd414839a5bbf0e3cd1a6513bd576b',
  LogDecreasePosition: '0x297c02479f01f3699adc73f58e91f5c4dfe76fb2da099070f5150b05fe67ebe4',
};

export class HmxAdapter extends Adapter {
  public readonly name: string = 'adapter.hmx';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
      [Signatures.CollectAddLiquidityFee]: EventSignatureMapping[Signatures.CollectAddLiquidityFee],
      [Signatures.CollectRemoveLiquidityFee]: EventSignatureMapping[Signatures.CollectRemoveLiquidityFee],
      [Signatures.LogDepositCollateral]: EventSignatureMapping[Signatures.LogDepositCollateral],
      [Signatures.LogWithdrawCollateral]: EventSignatureMapping[Signatures.LogWithdrawCollateral],
      [Signatures.LogIncreasePosition]: EventSignatureMapping[Signatures.LogIncreasePosition],
      [Signatures.LogDecreasePosition]: EventSignatureMapping[Signatures.LogDecreasePosition],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.AddLiquidity || signature === Signatures.RemoveLiquidity) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token ? event.token : event.tokenOut);
        if (token) {
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.amount ? event.amount.toString() : event.amountOut.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString();
          const action: KnownAction = signature === Signatures.AddLiquidity ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (
        signature === Signatures.CollectAddLiquidityFee ||
        signature === Signatures.CollectRemoveLiquidityFee
      ) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.user);
          const amount = new BigNumber(event.fee.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString();

          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} collect ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.LogDepositCollateral || signature === Signatures.LogWithdrawCollateral) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.primaryAccount);
          const amount = new BigNumber(event.amount.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString();
          const action: KnownAction = signature === Signatures.LogDepositCollateral ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.LogIncreasePosition || signature === Signatures.LogDecreasePosition) {
      }
    }

    return null;
  }
}
