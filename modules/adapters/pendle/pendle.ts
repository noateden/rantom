import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59',
  Redeem: '0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c',
  ClaimRewards: '0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f',
  Mint: '0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb',
  Burn: '0x4cf25bc1d991c17529c25213d3cc0cda295eeaad5f13f361969b12ea48015f90',
  Swap: '0x829000a5bc6a12d46e30cdcecd7c56b1efd88f6d7d059da6734a04f3764557c4',
};

export class PendleAdapter extends Adapter {
  public readonly name: string = 'adapter.pendle';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Redeem]: EventSignatureMapping[Signatures.Redeem],
      [Signatures.ClaimRewards]: EventSignatureMapping[Signatures.ClaimRewards],
      [Signatures.Mint]: config.customEventMapping
        ? config.customEventMapping[Signatures.Mint]
        : EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if ([Signatures.Deposit, Signatures.Redeem, Signatures.ClaimRewards].indexOf(signature) !== -1) {
        let tokens: Array<Token> = [];
        if (this.config.staticData) {
          for (const syToken of this.config.staticData.syTokens) {
            if (compareAddress(syToken.address, address)) {
              tokens = syToken.tokensIn.concat(syToken.tokensOut);
            }
          }
        }

        if (signature === Signatures.Deposit || signature == Signatures.Redeem) {
          const caller = normalizeAddress(event.caller);
          const receiver = normalizeAddress(event.receiver);

          let token: Token | null = null;
          const tokenAddress = signature === Signatures.Deposit ? event.tokenIn : event.tokenOut;
          for (const item of tokens) {
            if (compareAddress(item.address, tokenAddress)) {
              token = item;
            }
          }

          if (token) {
            const action: KnownAction = signature === Signatures.Deposit ? 'deposit' : 'withdraw';
            const amount = new BigNumber(event.amountDeposited ? event.amountDeposited : event.amountTokenOut)
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [caller, receiver],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${caller} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } else if (signature === Signatures.ClaimRewards) {
          const user = normalizeAddress(event.user);
          const tokens: Array<Token> = [];
          const amounts: Array<string> = [];

          for (let i = 0; i < event.rewardTokens.length; i++) {
            let token: Token | null = null;
            for (const item of tokens) {
              if (compareAddress(item.address, event.rewardTokens[i])) {
                token = item;
              }
            }
            if (token) {
              tokens.push(token);
              amounts.push(
                new BigNumber(event.rewardAmounts[i].toString())
                  .dividedBy(new BigNumber(10).pow(token.decimals))
                  .toString(10)
              );
            }
          }

          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [user],
            tokens: tokens,
            tokenAmounts: amounts,
            readableString: `${user} collect rewards on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if ([Signatures.Mint, Signatures.Burn, Signatures.Swap].indexOf(signature) !== -1) {
      }
    }

    return null;
  }
}
