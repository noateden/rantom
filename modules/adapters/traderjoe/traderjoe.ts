import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { TraderjoeHelper, TraderjoeLBPairInfo } from './helper';

const Signatures = {
  Swap: '0xc528cda9e500228b16ce84fadae290d9a49aecb17483110004c5af0a07f6fd73',
  DepositedToBin: '0x4216cc3bd0c40a90259d92f800c06ede5c47765f41a488072b7e7104a1f95841',
  WithdrawnFromBin: '0xda5e7177dface55f5e0eff7dfc67420a1db4243ddfcf0ecc84ed93e034dd8cc2',
  FlashLoan: '0x3659d15bd4bb92ab352a8d35bc3119ec6e7e0ab48e4d46201c8a28e02b6a8a86',
};

export class TraderjoeAdapter extends Adapter {
  public readonly name: string = 'adapter.traderjoe';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.DepositedToBin]: EventSignatureMapping[Signatures.DepositedToBin],
      [Signatures.WithdrawnFromBin]: EventSignatureMapping[Signatures.WithdrawnFromBin],
      [Signatures.FlashLoan]: EventSignatureMapping[Signatures.FlashLoan],
    });
  }

  private async getPairConfig(chain: string, address: string): Promise<TraderjoeLBPairInfo | null> {
    for (const pair of this.config.staticData.lbPairs) {
      if (compareAddress(pair.address, address) && chain === pair.chain) {
        return pair as TraderjoeLBPairInfo;
      }
    }

    return await TraderjoeHelper.getLBPairInfo(chain, address);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const lbPairInfo = await this.getPairConfig(chain, address);
    if (lbPairInfo !== null) {
      const signature = topics[0];
      if (
        this.config.contracts[chain] &&
        this.config.contracts[chain].indexOf(lbPairInfo.factory) !== -1 &&
        this.eventMappings[signature]
      ) {
        const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        switch (signature) {
          case Signatures.Swap: {
            const tokenIn = event.swapForY ? lbPairInfo.tokenX : lbPairInfo.tokenY;
            const tokenOut = event.swapForY ? lbPairInfo.tokenY : lbPairInfo.tokenX;
            const amounts: Array<string> = [
              new BigNumber(event.amountIn.toString()).dividedBy(new BigNumber(10).pow(tokenIn.decimals)).toString(10),
              new BigNumber(event.amountOut.toString())
                .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
                .toString(10),
            ];
            const sender = normalizeAddress(event.sender);
            const recipient = normalizeAddress(event.recipient);

            return {
              protocol: this.config.protocol,
              action: 'swap',
              addresses: [recipient, sender],
              tokens: [tokenIn, tokenOut],
              tokenAmounts: amounts,
              readableString: `${recipient} swap ${amounts[0]} ${tokenIn.symbol} for ${amounts[1]} ${tokenOut.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.DepositedToBin:
          case Signatures.WithdrawnFromBin: {
            const amounts: Array<string> = [
              new BigNumber(event.amountX.toString())
                .dividedBy(new BigNumber(10).pow(lbPairInfo.tokenX.decimals))
                .toString(10),
              new BigNumber(event.amountY.toString())
                .dividedBy(new BigNumber(10).pow(lbPairInfo.tokenX.decimals))
                .toString(10),
            ];
            const action: KnownAction = signature === Signatures.DepositedToBin ? 'deposit' : 'withdraw';
            const sender = normalizeAddress(event.sender);
            const recipient = normalizeAddress(event.recipient);

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [recipient, sender],
              tokens: [lbPairInfo.tokenX, lbPairInfo.tokenY],
              tokenAmounts: amounts,
              readableString: `${recipient} ${action} ${amounts[0]} ${lbPairInfo.tokenX.symbol} and ${amounts[1]} ${lbPairInfo.tokenY.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.FlashLoan: {
            const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
            if (token) {
              const amount = new BigNumber(event.amount.toString())
                .dividedBy(new BigNumber(10).pow(token.decimals))
                .toString(10);
              const sender = normalizeAddress(event.sender);
              const receiver = normalizeAddress(event.receiver);
              return {
                protocol: this.config.protocol,
                action: 'flashloan',
                addresses: [sender, receiver],
                tokens: [lbPairInfo.tokenX, lbPairInfo.tokenY],
                tokenAmounts: [amount],
                readableString: `${sender} flashloan ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }
          }
        }
      }
    }

    return null;
  }
}
