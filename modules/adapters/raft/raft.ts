import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  StETHPositionChanged: '0x8ec6bac52c41abc2cd8ffecf547e7916fa2412325d10243ca4cf318727cda019',
};

export class RaftAdapter extends Adapter {
  public readonly name: string = 'adapter.raft';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.StETHPositionChanged]: EventSignatureMapping[Signatures.StETHPositionChanged],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.StETHPositionChanged) {
        const borrower = normalizeAddress(event.position);
        const debtAmount = new BigNumber(event.debtAmount.toString()).dividedBy(1e18).toString(10);
        const collateralAmount = new BigNumber(event.collateralAmount.toString()).dividedBy(1e18).toString(10);

        if (debtAmount !== '0') {
          const action: KnownAction = event.isDebtIncrease ? 'borrow' : 'repay';
          const subAction: KnownAction = event.isCollateralIncrease ? 'deposit' : 'withdraw';
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [Tokens.ethereum.R],
            tokenAmounts: [debtAmount],
            readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.R.symbol} on ${this.config.protocol} chain ${chain}`,
            subActions: [
              {
                protocol: this.config.protocol,
                action: subAction,
                addresses: [borrower],
                tokens: [Tokens.ethereum.NativeCoin],
                tokenAmounts: [collateralAmount],
                readableString: `${borrower} ${subAction} ${collateralAmount} ${Tokens.ethereum.wstETH.symbol} on ${this.config.protocol} chain ${chain}`,
              },
            ],
          };
        } else {
          const action: KnownAction = event.isCollateralIncrease ? 'deposit' : 'withdraw';
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [Tokens.ethereum.wstETH],
            tokenAmounts: [collateralAmount],
            readableString: `${borrower} ${action} ${collateralAmount} ${Tokens.ethereum.wstETH.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
