import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Borrow: '0xe1979fe4c35e0cef342fef5668e2c8e7a7e9f5d5d1ca8fee0ac6c427fa4153af',
  Repay: '0x77c6871227e5d2dec8dadd5354f78453203e22e669cd0ec4c19d9a8c5edb31d0',
  RemoveCollateral: '0xe25410a4059619c9594dc6f022fe231b02aaea733f689e7ab0cd21b3d4d0eb54',
  Liquidate: '0x642dd4d37ddd32036b9797cec464c0045dd2118c549066ae6b0f88e32240c2d0',
};

const Collaterals: { [key: string]: Token } = {
  '0x8472a9a7632b173c8cf3a86d3afec50c35548e76': Tokens.ethereum.sfrxETH,
  '0xec0820efafc41d8943ee8de495fc9ba8495b15cf': Tokens.ethereum.sfrxETH,
  '0x100daa78fc509db39ef7d04de0c1abd299f4c6ce': Tokens.ethereum.wstETH,
  '0x4e59541306910ad6dc1dac0ac9dfb29bd9f15c67': Tokens.ethereum.WBTC,
  '0xa920de414ea4ab66b97da1bfe9e6eca7d4219635': Tokens.ethereum.ETH,
  '0x1c91da0223c763d2e0173243eadaa0a2ea47e704': Tokens.ethereum.tBTC,
};

export class CrvusdAdapter extends Adapter {
  public readonly name: string = 'adapter.crvusd';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.RemoveCollateral]: EventSignatureMapping[Signatures.RemoveCollateral],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
      if (signature === Signatures.Borrow) {
        const user = normalizeAddress(event.user);
        const token = Collaterals[normalizeAddress(address)];

        const loanAmount = new BigNumber(event.loan_increase).dividedBy(1e18).toString();
        const collateralAmount = new BigNumber(event.collateral_increase.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'borrow',
          tokens: [Tokens.ethereum.crvUSD],
          tokenAmounts: [loanAmount],
          addresses: [user],
          readableString: `${user} borrow ${loanAmount} ${Tokens.ethereum.crvUSD.symbol} on ${this.config.protocol} chain ${chain}`,
          subActions: [
            {
              protocol: this.config.protocol,
              action: 'deposit',
              tokens: [token],
              tokenAmounts: [collateralAmount],
              addresses: [user],
              readableString: `${user} deposit ${loanAmount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            },
          ],
        };
      } else if (signature === Signatures.Repay) {
        const user = normalizeAddress(event.user);
        const token = Collaterals[normalizeAddress(address)];

        const loanAmount = new BigNumber(event.loan_decrease).dividedBy(1e18).toString();
        const collateralAmount = new BigNumber(event.collateral_decrease.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'repay',
          tokens: [Tokens.ethereum.crvUSD],
          tokenAmounts: [loanAmount],
          addresses: [user],
          readableString: `${user} repay ${loanAmount} ${Tokens.ethereum.crvUSD.symbol} on ${this.config.protocol} chain ${chain}`,
          subActions: [
            {
              protocol: this.config.protocol,
              action: 'withdraw',
              tokens: [token],
              tokenAmounts: [collateralAmount],
              addresses: [user],
              readableString: `${user} withdraw ${loanAmount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            },
          ],
        };
      } else if (signature === Signatures.RemoveCollateral) {
        const user = normalizeAddress(event.user);
        const token = Collaterals[normalizeAddress(address)];

        const collateralAmount = new BigNumber(event.collateral_decrease.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'withdraw',
          tokens: [token],
          tokenAmounts: [collateralAmount],
          addresses: [user],
          readableString: `${user} withdraw ${collateralAmount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      } else if (signature === Signatures.Liquidate) {
        const user = normalizeAddress(event.user);
        const liquidator = normalizeAddress(event.liquidator);
        const token = Collaterals[normalizeAddress(address)];

        const collateralAmount = new BigNumber(event.collateral_received.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'liquidate',
          tokens: [token],
          tokenAmounts: [collateralAmount],
          addresses: [liquidator, user],
          readableString: `${user} liquidate ${collateralAmount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
