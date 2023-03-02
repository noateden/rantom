import { normalizeAddress } from '../../../lib/helper';
import { Contract, Token } from '../../../types/configs';
import { LendingAction, LendingEvent, MongoCollections } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class AaveWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.aave';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>): Promise<any> {
    const actions: Array<LendingEvent> = [];

    for (const event of events) {
      const reserveAddress =
        event.event === 'LiquidationCall'
          ? event.returnValues.collateralAsset
          : event.event === 'FlashLoan'
          ? event.returnValues.asset
          : event.returnValues.reserve;

      const token = await this.providers.web3Helper.getErc20Metadata(contract.chain, reserveAddress);
      if (!token) {
        continue;
      }

      let action: LendingAction = 'supply';
      const amount =
        event.event === 'LiquidationCall'
          ? event.returnValues.amount.liquidatedCollateralAmount.toString()
          : event.returnValues.amount.toString();
      let caller = normalizeAddress(event.returnValues.user);
      let user = normalizeAddress(event.returnValues.onBehalfOf);
      let borrowRate = '0';
      const timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);

      if (event.event === 'Withdraw') {
        action = 'withdraw';
        user = normalizeAddress(event.returnValues.to);
      } else if (event.event === 'Borrow') {
        action = 'borrow';
        borrowRate = event.returnValues.borrowRate.toString();
      } else if (event.event === 'Repay') {
        action = 'repay';
        user = normalizeAddress(event.returnValues.repayer);
      } else if (event.event === 'LiquidationCall') {
        caller = normalizeAddress(event.returnValues.liquidator);
        user = normalizeAddress(event.returnValues.user);
      } else if (event.event === 'FlashLoan') {
        action = 'flashloan';
        caller = normalizeAddress(event.returnValues.initiator);
        user = normalizeAddress(event.returnValues.target);
      }

      let debtToken: Token | null = null;
      if (event.event === 'LiquidationCall') {
        debtToken = await this.providers.web3Helper.getErc20Metadata(contract.chain, event.returnValues.debtAsset);
      }

      actions.push({
        chain: contract.chain,
        contract: normalizeAddress(contract.address),
        transactionHash: event.transactionHash,
        logIndex: event.logIndex,
        protocol: contract.protocol,
        timestamp: timestamp,
        blockNumber: event.blockNumber,
        action: action,
        token: token,
        amount: amount,
        caller: caller,
        user: user,
        borrowRate: borrowRate !== '0' ? borrowRate : undefined,
        debtToken: debtToken ? debtToken : undefined,
        debtAmount: debtToken ? event.returnValues.debtToCover.toString() : undefined,
      });
    }

    const operations: Array<any> = [];
    for (const action of actions) {
      operations.push({
        updateOne: {
          filter: {
            chain: action.chain,
            contract: action.contract,
            transactionHash: action.transactionHash,
            logIndex: action.logIndex,
          },
          update: {
            $set: {
              ...action,
            },
          },
          upsert: true,
        },
      });
    }
    if (operations.length > 0) {
      const collections: MongoCollections = await this.providers.mongodb.requireCollections();
      await collections.lendingActionsCollection.bulkWrite(operations);
    }
  }
}
