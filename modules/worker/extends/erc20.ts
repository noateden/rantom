import { AddressZero } from '../../../configs/constants';
import { Erc20Contract } from '../../../configs/contracts/erc20';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { Contract } from '../../../types/configs';
import { Erc20SupplyEvent, MongoCollections } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

// this worker looks for ERC20 tokens Mint/Burn
export class Erc20SupplyWorker extends ContractWorker {
  public readonly name: string = 'worker.erc20';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async processEvents(contract: Contract, events: Array<any>, options: any): Promise<any> {
    const actions: Array<Erc20SupplyEvent> = [];

    for (const event of events) {
      const transformedEvent: Erc20SupplyEvent | null = await this.parseTransferEvent(contract, event, options);
      if (transformedEvent) {
        actions.push(transformedEvent);
      }
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
      await collections.erc20SupplyActionsCollection.bulkWrite(operations);
    }
  }

  public async parseTransferEvent(contract: Contract, event: any, options: any): Promise<Erc20SupplyEvent | null> {
    if (event.event !== 'Transfer') return null;

    let timestamp =
      options && options.blockTimes && options.blockTimes[event.blockNumber.toString()]
        ? Number(options.blockTimes[event.blockNumber.toString()].timestamp)
        : null;
    if (!timestamp) {
      timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    }

    const logIndex = event.logIndex;
    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    if (compareAddress(event.returnValues.to, AddressZero) || compareAddress(event.returnValues.from, AddressZero)) {
      return {
        chain: contract.chain,
        contract: contract.address,
        transactionHash: transactionHash,
        logIndex: logIndex,
        action: compareAddress(event.returnValues.to, AddressZero) ? 'mint' : 'burn',
        blockNumber: blockNumber,
        timestamp: timestamp,
        symbol: (contract as Erc20Contract).token.symbol,
        decimals: (contract as Erc20Contract).token.decimals,
        amount: event.returnValues.value.toString(),
        address: compareAddress(event.returnValues.to, AddressZero)
          ? normalizeAddress(event.returnValues.from)
          : normalizeAddress(event.returnValues.to),
      };
    }

    return null;
  }
}
