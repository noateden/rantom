import BigNumber from 'bignumber.js';

import { FraxlendConfig, FraxlendPair } from '../../../configs/protocols/fraxlend';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { FraxlendAbiMappings, FraxlendEventSignatures } from './abis';

export default class FraxlendAdapter extends Adapter {
  public readonly name: string = 'adapter.fraxlend';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = FraxlendAbiMappings;
  }

  protected getPair(marketAddress: string): FraxlendPair | null {
    for (const market of (this.config as FraxlendConfig).contracts) {
      if (compareAddress(marketAddress, market.address)) {
        return market as FraxlendPair;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const pair = this.getPair(options.log.address);
      if (pair) {
        switch (signature) {
          case FraxlendEventSignatures.Deposit:
          case FraxlendEventSignatures.Withdraw: {
            const sender = normalizeAddress(event.sender ? event.sender : event.caller);
            const owner = normalizeAddress(event.owner);
            const action: KnownAction = signature === FraxlendEventSignatures.Deposit ? 'deposit' : 'withdraw';
            const amount = formatFromDecimals(event.assets.toString(), pair.debtToken.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [sender, owner],
                tokens: [pair.debtToken],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case FraxlendEventSignatures.AddCollateral:
          case FraxlendEventSignatures.RemoveCollateral: {
            const sender = normalizeAddress(event._sender);
            const borrower = normalizeAddress(event._borrower);
            const action: KnownAction = signature === FraxlendEventSignatures.AddCollateral ? 'deposit' : 'withdraw';
            const amount = formatFromDecimals(event._collateralAmount.toString(), pair.collateralToken.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [sender, borrower],
                tokens: [pair.collateralToken],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case FraxlendEventSignatures.BorrowAsset:
          case FraxlendEventSignatures.RepayAsset: {
            const amount = formatFromDecimals(
              event._borrowAmount ? event._borrowAmount.toString() : event._amountToRepay.toString(),
              pair.debtToken.decimals
            );
            const borrower = normalizeAddress(event._borrower);
            const action: KnownAction = signature === FraxlendEventSignatures.BorrowAsset ? 'borrow' : 'repay';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [borrower],
                tokens: [pair.debtToken],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case FraxlendEventSignatures.Liquidate: {
            const amount = new BigNumber(event._collateralForLiquidator.toString())
              .dividedBy(new BigNumber(10).pow(pair.collateralToken.decimals))
              .toString(10);
            const borrower = normalizeAddress(event._borrower);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'liquidate',
                addresses: [borrower],
                tokens: [pair.collateralToken],
                tokenAmounts: [amount],
              })
            );

            break;
          }
        }
      }
    }

    return actions;
  }
}
