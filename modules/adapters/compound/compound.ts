import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import cErc20Abi from '../../../configs/abi/compound/cErc20.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Mint: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  Redeem: '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929',
  Borrow: '0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80',
  Repay: '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1',
  Liquidate: '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52',
  DistributedSupplierComp: '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
  DistributedBorrowerComp: '0x1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6',
};

export class CompoundAdapter extends Adapter {
  public readonly name: string = 'adapter.compound';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Redeem]: EventSignatureMapping[Signatures.Redeem],
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
      [Signatures.DistributedSupplierComp]: EventSignatureMapping[Signatures.DistributedSupplierComp],
      [Signatures.DistributedBorrowerComp]: EventSignatureMapping[Signatures.DistributedBorrowerComp],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain].indexOf(address) !== -1 &&
      (EventSignatureMapping[signature] ||
        (this.config.customEventMapping && this.config.customEventMapping[signature]))
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      let event;
      if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
        event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
      } else {
        event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      }

      if (signature === Signatures.DistributedSupplierComp || signature === Signatures.DistributedBorrowerComp) {
        const collector = event.supplier ? normalizeAddress(event.supplier) : normalizeAddress(event.borrower);
        const amount = new BigNumber(event.compDelta).dividedBy(1e18).toString(10);
        return {
          protocol: this.config.protocol,
          action: 'collect',
          addresses: [collector],
          tokens: [Tokens.ethereum.COMP],
          tokenAmounts: [amount],
          readableString: `${collector} collect ${amount} ${Tokens.ethereum.COMP.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      } else {
        const poolContract = new web3.eth.Contract(cErc20Abi as any, address);
        let token: Token | null;
        try {
          const underlyingAddr = await poolContract.methods.underlying().call();
          token = await this.getWeb3Helper().getErc20Metadata(chain, underlyingAddr);
        } catch (e: any) {
          token = Tokens[chain].NativeCoin;
        }

        if (token) {
          switch (signature) {
            case Signatures.Mint:
            case Signatures.Redeem:
            case Signatures.Borrow: {
              const user = normalizeAddress(event[0]);
              const amount = new BigNumber(event[1].toString())
                .dividedBy(new BigNumber(10).pow(token.decimals))
                .toString(10);

              const action: KnownAction =
                signature === Signatures.Mint ? 'deposit' : signature === Signatures.Redeem ? 'withdraw' : 'borrow';

              return {
                protocol: this.config.protocol,
                action: action,
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
                readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }

            case Signatures.Repay: {
              const payer = normalizeAddress(event.payer);
              const borrower = normalizeAddress(event.borrower);
              const amount = new BigNumber(event.repayAmount.toString())
                .dividedBy(new BigNumber(10).pow(token.decimals))
                .toString(10);

              return {
                protocol: this.config.protocol,
                action: 'repay',
                addresses: [payer, borrower],
                tokens: [token],
                tokenAmounts: [amount],
                readableString: `${payer} repay ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
              };
            }

            case Signatures.Liquidate: {
              const liquidator = normalizeAddress(event.liquidator);
              const borrower = normalizeAddress(event.borrower);

              const collateralPoolContract = new web3.eth.Contract(cErc20Abi as any, event.cTokenCollateral);
              let collateral: Token | null;
              try {
                const underlyingAddr = await collateralPoolContract.methods.underlying().call();
                collateral = await this.getWeb3Helper().getErc20Metadata(chain, underlyingAddr);
              } catch (e: any) {
                collateral = Tokens[chain].NativeCoin;
              }

              if (collateral) {
                const exchangeRateCurrent = await collateralPoolContract.methods.exchangeRateCurrent().call();
                const mantissa = 18 + collateral.decimals - 8;
                const oneCTokenInUnderlying = new BigNumber(exchangeRateCurrent).dividedBy(
                  new BigNumber(10).pow(mantissa)
                );
                const amount = new BigNumber(event.seizeTokens)
                  .multipliedBy(oneCTokenInUnderlying)
                  .dividedBy(1e8)
                  .toString(10);
                return {
                  protocol: this.config.protocol,
                  action: 'liquidate',
                  addresses: [liquidator, borrower],
                  tokens: [collateral],
                  tokenAmounts: [amount],
                  readableString: `${liquidator} liquidate ${amount} ${collateral.symbol} on ${this.config.protocol} chain ${chain}`,
                  addition: {
                    debtToken: token,
                    debtAmount: new BigNumber(event.repayAmount)
                      .dividedBy(new BigNumber(10).pow(token.decimals))
                      .toString(10),
                  },
                };
              }
              break;
            }
          }
        }
      }
    }

    return null;
  }
}
