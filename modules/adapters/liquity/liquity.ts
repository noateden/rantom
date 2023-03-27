import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import TroveManagerAbi from '../../../configs/abi/liquity/TroveManager.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  TroveUpdated: '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b',
  TroveLiquidated: '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434',
};

export class LiquityAdapter extends Adapter {
  public readonly name: string = 'adapter.liquity';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TroveUpdated]: EventSignatureMapping[Signatures.TroveUpdated],
      [Signatures.TroveLiquidated]: EventSignatureMapping[Signatures.TroveLiquidated],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1 &&
      EventSignatureMapping[signature]
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      if (
        signature === Signatures.TroveUpdated &&
        !compareAddress(address, this.config.staticData.troveManagerAddress)
      ) {
        let action: KnownAction = 'borrow';
        let debtAmount = '0';
        let collateralAmount = '0';

        const borrower = normalizeAddress(event._borrower);
        const operation = Number(event._operation);
        switch (operation) {
          case 0:
          case 1: {
            // open or close trove
            debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);
            collateralAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);

            action = operation === 0 ? 'borrow' : 'repay';

            break;
          }
          case 2: {
            // adjust trove
            const troveManager = new web3.eth.Contract(
              TroveManagerAbi as any,
              this.config.staticData.troveManagerAddress
            );

            // get trove snapshot from previous block
            let blockNumber = options.context ? options.context.blockNumber : null;
            if (!blockNumber) {
              const transaction = await web3.eth.getTransaction(options.hash as string);
              blockNumber = transaction.blockNumber;
            }
            const troveInfo = await troveManager.methods.Troves(event._borrower).call(blockNumber - 1);

            const previousDebt = new BigNumber(troveInfo.debt);
            const newDebt = new BigNumber(event._debt);
            const previousColl = new BigNumber(troveInfo.coll);
            const newColl = new BigNumber(event._coll);

            debtAmount = newDebt.minus(previousDebt).abs().dividedBy(1e18).toString(10);
            collateralAmount = newColl.minus(previousColl).abs().dividedBy(1e18).toString(10);

            if (debtAmount !== '0') {
              // adjust debt balance
              action = previousDebt.lt(newDebt) ? 'borrow' : 'repay';
            } else {
              // adjust coll balance
              action = previousColl.lt(newColl) ? 'deposit' : 'withdraw';
            }

            break;
          }
        }

        if (action === 'borrow' || action === 'repay') {
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [Tokens.ethereum.LUSD],
            tokenAmounts: [debtAmount],
            readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.LUSD.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              collateral: {
                token: Tokens.ethereum.NativeCoin,
                amount: collateralAmount,
              },
            },
          };
        } else if (action === 'deposit' || action === 'withdraw') {
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [Tokens.ethereum.NativeCoin],
            tokenAmounts: [collateralAmount],
            readableString: `${borrower} ${action} ${collateralAmount} ${Tokens.ethereum.NativeCoin.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.TroveLiquidated) {
        const borrower = normalizeAddress(event._borrower);
        const collAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);
        const debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'liquidate',
          addresses: [borrower],
          tokens: [Tokens.ethereum.NativeCoin],
          tokenAmounts: [collAmount],
          readableString: `${borrower} liquidate ${collAmount} ${Tokens.ethereum.NativeCoin.symbol} on ${this.config.protocol} chain ${chain}`,
          addition: {
            debtToken: Tokens.ethereum.LUSD,
            debtAmount: debtAmount,
          },
        };
      }
    }

    return null;
  }
}
