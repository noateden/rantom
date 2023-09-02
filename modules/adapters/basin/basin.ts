import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import WellAbi from '../../../configs/abi/basin/Well.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Swap: '0xb39c9bc43f811e1a7ce159c5f147458fdb80266bf23c17322013316e27e086d0',
  AddLiquidity: '0x91a6d8e872c9887412278189089c9936e99450551cc971309ff282f79bfef56f',
  RemoveLiquidity: '0xf4358595ad4956678c919635516976c76f95de0ce5a56b61ef35931b8c05dc04',
  RemoveLiquidityOneToken: '0x6f08fb00dac40d918cc84a5080754603d4f9a13a2437d87e06fd75ab944c7575',
  Shift: '0x1ee4a8e2e74af07abadd6b0b5f8f8bd96a54656e3bb7d987c5075a0c8b9f0df5',
};

export class BasinAdapter extends Adapter {
  public readonly name: string = 'adapter.basin';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
      [Signatures.RemoveLiquidityOneToken]: EventSignatureMapping[Signatures.RemoveLiquidityOneToken],
      [Signatures.Shift]: EventSignatureMapping[Signatures.Shift],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.AddLiquidity || signature === Signatures.RemoveLiquidity) {
        try {
          const contract = new web3.eth.Contract(WellAbi as any, address);
          const tokenAddresses = await contract.methods.tokens().call();
          const tokens: Array<Token> = [];
          for (const tokenAddress of tokenAddresses) {
            const token = await this.getWeb3Helper().getErc20Metadata(chain, tokenAddress);
            if (token) {
              tokens.push(token);
            } else {
              return null;
            }
          }

          const amounts: Array<string> = [];
          const rawAmounts = event.tokenAmountsIn ? event.tokenAmountsIn : event.tokenAmountsOut;
          for (let i = 0; i < rawAmounts.length; i++) {
            amounts.push(
              new BigNumber(rawAmounts[i].toString()).dividedBy(new BigNumber(10).pow(tokens[i].decimals)).toString(10)
            );
          }

          const recipient = normalizeAddress(event.recipient);
          let action: KnownAction = signature === Signatures.AddLiquidity ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [recipient],
            tokens: tokens,
            tokenAmounts: amounts,
            readableString: `${recipient} ${action} ${tokens.map((item) => item.symbol).toString()} on ${
              this.config.protocol
            } chain ${chain}`,
          };
        } catch (e: any) {
          console.log(e);
        }
      } else if (signature === Signatures.Swap) {
        const fromToken = await this.getWeb3Helper().getErc20Metadata(chain, event.fromToken);
        const toToken = await this.getWeb3Helper().getErc20Metadata(chain, event.toToken);
        if (fromToken && toToken) {
          const fromAmount = new BigNumber(event.amountIn.toString())
            .dividedBy(new BigNumber(10).pow(fromToken.decimals))
            .toString(10);
          const toAmount = new BigNumber(event.amountOut.toString())
            .dividedBy(new BigNumber(10).pow(toToken.decimals))
            .toString(10);
          const recipient = normalizeAddress(event.recipient);
          return {
            protocol: this.config.protocol,
            action: 'swap',
            addresses: [recipient],
            tokens: [fromToken, toToken],
            tokenAmounts: [fromAmount, toAmount],
            readableString: `${recipient} swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        const token = await this.getWeb3Helper().getErc20Metadata(
          chain,
          event.toToken ? event.toToken : event.tokenOut
        );
        if (token) {
          const amount = new BigNumber(event.amountOut ? event.amountOut.toString() : event.tokenAmountOut.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);
          const recipient = normalizeAddress(event.recipient);
          let action: KnownAction = 'withdraw';
          if (signature === Signatures.Shift) {
            action = 'collect';
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [recipient],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${recipient} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
