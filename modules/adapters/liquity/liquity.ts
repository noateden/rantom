import BigNumber from 'bignumber.js';

import TroveManagerAbi from '../../../configs/abi/liquity/TroveManager.json';
import { LiquityConfig, LiquityMarket } from '../../../configs/protocols/liquity';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { LiquityAbiMappings, LiquityEventSignatures } from './abis';

interface GetTroveStateInfo {
  debtAmount: string;
  collAmount: string;
  isBorrow: boolean;
}

export default class LiquityAdapter extends Adapter {
  public readonly name: string = 'adapter.liquity';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = LiquityAbiMappings;
  }

  protected getMarket(options: ParseEventLogOptions): LiquityMarket | null {
    for (const market of (this.config as LiquityConfig).markets) {
      if (
        compareAddress(market.borrowOperation.address, options.log.address) ||
        compareAddress(market.troveManager.address, options.log.address)
      ) {
        return market as LiquityMarket;
      }
    }

    return null;
  }

  protected async getTroveState(
    options: ParseEventLogOptions,
    market: LiquityMarket,
    decodedEvent: any
  ): Promise<GetTroveStateInfo> {
    const troveInfo = await this.services.blockchain.singlecall({
      chain: options.chain,
      target: market.troveManager.address,
      abi: TroveManagerAbi,
      method: 'Troves',
      params: [decodedEvent._borrower],
      blockNumber: Number(options.log.blockNumber) - 1,
    });

    const previousDebt = new BigNumber(troveInfo.debt);
    const newDebt = new BigNumber(decodedEvent._debt);
    const previousColl = new BigNumber(troveInfo.coll);
    const newColl = new BigNumber(decodedEvent._coll);

    return {
      debtAmount: newDebt.minus(previousDebt).abs().dividedBy(1e18).toString(10),
      collAmount: newColl.minus(previousColl).abs().dividedBy(1e18).toString(10),
      isBorrow: previousDebt.lte(newDebt),
    };
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const market = this.getMarket(options);

      if (market) {
        const signature = options.log.topics[0];
        const web3 = this.services.blockchain.getProvider(options.chain);
        const event = web3.eth.abi.decodeLog(
          this.eventMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );

        if (signature === LiquityEventSignatures.TroveUpdated) {
          const redeem = compareAddress(market.troveManager.address, options.log.address);
          if (redeem) {
            // redeem on trove manager
            const info: GetTroveStateInfo = await this.getTroveState(options, market, event);

            const borrower = normalizeAddress(event._borrower);
            const action = info.isBorrow ? 'borrow' : 'repay';
            const subAction = info.isBorrow ? 'deposit' : 'withdraw';
            const debtAmount = info.debtAmount;
            const collAmount = info.collAmount;

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [borrower],
                tokens: [market.debtToken],
                tokenAmounts: [debtAmount],
              })
            );
            actions.push({
              ...this.buildUpAction({
                ...options,
                action: subAction,
                addresses: [borrower],
                tokens: [market.collToken],
                tokenAmounts: [collAmount],
              }),
              logIndex: `${options.log.logIndex}:1`,
            });
          } else {
            // borrow/repay with borrow operation
            const borrower = normalizeAddress(event._borrower);
            const operation = Number(event._operation);

            let debtAmount = '0';
            let collAmount = '0';

            let action: KnownAction = operation === 0 ? 'borrow' : 'repay';
            let subAction: KnownAction = operation === 0 ? 'deposit' : 'withdraw';

            if (operation === 0 || operation === 1) {
              // open or close trove
              debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);
              collAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);
            } else {
              // get trove snapshot from previous block
              const info: GetTroveStateInfo = await this.getTroveState(options, market, event);

              action = info.isBorrow ? 'borrow' : 'repay';
              subAction = info.isBorrow ? 'deposit' : 'withdraw';
              debtAmount = info.debtAmount;
              collAmount = info.collAmount;
            }

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [borrower],
                tokens: [market.debtToken],
                tokenAmounts: [debtAmount],
              })
            );
            actions.push({
              ...this.buildUpAction({
                ...options,
                action: subAction,
                addresses: [borrower],
                tokens: [market.collToken],
                tokenAmounts: [collAmount],
              }),
              logIndex: `${options.log.logIndex}:1`,
            });
          }
        } else if (signature === LiquityEventSignatures.TroveLiquidated) {
          const borrower = normalizeAddress(event._borrower);
          const collAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);
          const debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'liquidate',
              addresses: [borrower],
              tokens: [market.collToken, market.debtToken],
              tokenAmounts: [collAmount, debtAmount],
            })
          );
        }
      }
    }

    return actions;
  }
}
