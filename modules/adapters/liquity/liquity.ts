import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import StabilityPoolAbi from '../../../configs/abi/liquity/StabilityPool.json';
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
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  TroveUpdated: '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b',
  TroveLiquidated: '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434',
  UserDepositChanged: '0xbce78369dccab09eec1986f4d409ab09ffbb47d65423e5148fcf98411c5111c9',
  ETHGainWithdrawn: '0x51457222ebca92c335c9c86e2baa1cc0e40ffaa9084a51452980d5ba8dec2f63',
  LQTYPaidToDepositor: '0x2608b986a6ac0f6c629ca37018e80af5561e366252ae93602a96d3ab2e73e42d',
};

export class LiquityAdapter extends Adapter {
  public readonly name: string = 'adapter.liquity';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TroveUpdated]: EventSignatureMapping[Signatures.TroveUpdated],
      [Signatures.TroveLiquidated]: EventSignatureMapping[Signatures.TroveLiquidated],
      [Signatures.UserDepositChanged]: EventSignatureMapping[Signatures.UserDepositChanged],
      [Signatures.ETHGainWithdrawn]: EventSignatureMapping[Signatures.ETHGainWithdrawn],
      [Signatures.LQTYPaidToDepositor]: EventSignatureMapping[Signatures.LQTYPaidToDepositor],
    });
  }

  public async tryParsingMultipleActions(options: AdapterParseLogOptions): Promise<Array<TransactionAction>> {
    const { chain, address, topics, data } = options;

    const actions: Array<TransactionAction> = [];
    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (
        signature === Signatures.TroveUpdated &&
        !compareAddress(address, this.config.staticData.troveManagerAddress)
      ) {
        const borrower = normalizeAddress(event._borrower);
        const operation = Number(event._operation);
        switch (operation) {
          case 0:
          case 1: {
            // open or close trove
            const debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);
            const collateralAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);

            const action = operation === 0 ? 'borrow' : 'repay';

            actions.push({
              protocol: this.config.protocol,
              action: action,
              addresses: [borrower],
              tokens: [Tokens.ethereum.LUSD],
              tokenAmounts: [debtAmount],
              readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.LUSD.symbol} on ${this.config.protocol} chain ${chain}`,
            });

            if (collateralAmount !== '0') {
              actions.push({
                protocol: this.config.protocol,
                action: 'deposit',
                addresses: [borrower],
                tokens: [Tokens.ethereum.NativeCoin],
                tokenAmounts: [collateralAmount],
                readableString: `${borrower} deposit ${collateralAmount} ${Tokens.ethereum.NativeCoin.symbol} on ${this.config.protocol} chain ${chain}`,
              });
            }

            break;
          }
          case 2: {
            // get trove snapshot from previous block
            let blockNumber = options.context ? options.context.blockNumber : null;
            if (!blockNumber) {
              const transaction = await web3.eth.getTransaction(options.hash as string);
              blockNumber = transaction.blockNumber;
            }
            const troveInfo = await rpcWrapper.queryContract({
              chain,
              abi: TroveManagerAbi,
              contract: this.config.staticData.troveManagerAddress,
              method: 'Troves',
              params: [event._borrower],
              blockNumber: blockNumber - 1,
            });

            const previousDebt = new BigNumber(troveInfo.debt);
            const newDebt = new BigNumber(event._debt);
            const previousColl = new BigNumber(troveInfo.coll);
            const newColl = new BigNumber(event._coll);

            const debtAmount = newDebt.minus(previousDebt).abs().dividedBy(1e18).toString(10);
            const collateralAmount = newColl.minus(previousColl).abs().dividedBy(1e18).toString(10);

            if (debtAmount !== '0') {
              // adjust debt balance
              const action = previousDebt.lt(newDebt) ? 'borrow' : 'repay';
              actions.push({
                protocol: this.config.protocol,
                action: action,
                addresses: [borrower],
                tokens: [Tokens.ethereum.LUSD],
                tokenAmounts: [debtAmount],
                readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.LUSD.symbol} on ${this.config.protocol} chain ${chain}`,
              });
            }

            if (collateralAmount !== '0') {
              // adjust coll balance
              const action = previousColl.lt(newColl) ? 'deposit' : 'withdraw';
              actions.push({
                protocol: this.config.protocol,
                action: action,
                addresses: [borrower],
                tokens: [Tokens.ethereum.NativeCoin],
                tokenAmounts: [collateralAmount],
                readableString: `${borrower} ${action} ${collateralAmount} ${Tokens.ethereum.NativeCoin.symbol} on ${this.config.protocol} chain ${chain}`,
              });
            }

            break;
          }
        }
      }
    }

    return actions;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.TroveLiquidated) {
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
      } else if (signature === Signatures.UserDepositChanged) {
        // we detect the LUSD transfer event that match with calculation
        if (options.context && options.context.logs) {
          for (const log of options.context.logs) {
            if (log.topics[0] === Signatures.Transfer) {
              if (compareAddress(log.address, Tokens.ethereum.LUSD.address)) {
                // must be LUSD token
                const transferEvent = web3.eth.abi.decodeLog(
                  EventSignatureMapping[log.topics[0]].abi,
                  log.data,
                  log.topics.slice(1)
                );
                const value = new BigNumber(transferEvent.value.toString()).dividedBy(1e18).toString(10);

                const depositor = normalizeAddress(event._depositor);
                const newDeposit = new BigNumber(event._newDeposit).dividedBy(1e18);

                // get trove snapshot from previous block
                let blockNumber = options.context ? options.context.blockNumber : null;
                if (!blockNumber) {
                  const transaction = await web3.eth.getTransaction(options.hash as string);
                  blockNumber = transaction.blockNumber;
                }

                const depositInfo = await rpcWrapper.queryContract({
                  chain,
                  abi: StabilityPoolAbi,
                  contract: address,
                  method: 'deposits',
                  params: [depositor],
                  blockNumber: blockNumber - 1,
                });

                const amount = newDeposit.minus(new BigNumber(depositInfo.initialValue.toString()).dividedBy(1e18));

                if (amount.abs().toString(10) === value) {
                  const action: KnownAction = amount.gt(0) ? 'deposit' : 'withdraw';

                  return {
                    protocol: this.config.protocol,
                    action: action,
                    addresses: [depositor],
                    tokens: [Tokens.ethereum.LUSD],
                    tokenAmounts: [amount.abs().toString(10)],
                    readableString: `${depositor} ${action} ${amount.abs().toString(10)} ${
                      Tokens.ethereum.LUSD.symbol
                    } on ${this.config.protocol} chain ${chain}`,
                  };
                }
              }
            }
          }
        }
      } else if (signature === Signatures.ETHGainWithdrawn) {
        const depositor = normalizeAddress(event._depositor);
        const amount = new BigNumber(event._ETH).dividedBy(1e18).toString(10);

        if (amount !== '0') {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [depositor],
            tokens: [Tokens.ethereum.ETH],
            tokenAmounts: [amount],
            readableString: `${depositor} collect ${amount} ${Tokens.ethereum.ETH.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.LQTYPaidToDepositor) {
        const depositor = normalizeAddress(event._depositor);
        const amount = new BigNumber(event._LQTY).dividedBy(1e18).toString(10);

        if (amount !== '0') {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [depositor],
            tokens: [Tokens.ethereum.LQTY],
            tokenAmounts: [amount],
            readableString: `${depositor} collect ${amount} ${Tokens.ethereum.LQTY.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
