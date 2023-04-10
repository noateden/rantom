import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { Contract, FactoryContract } from '../../../types/configs';
import { LiquidityPool } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { ContractWorker } from '../worker';

export class FactoryWorkerHook extends ContractWorker {
  public readonly name: string = 'worker.factory';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public async parseEvent(contract: FactoryContract, event: any, options: any): Promise<LiquidityPool | null> {
    let timestamp =
      options && options.blockTimes && options.blockTimes[event.blockNumber.toString()]
        ? Number(options.blockTimes[event.blockNumber.toString()].timestamp)
        : null;
    if (!timestamp) {
      timestamp = await this.providers.web3Helper.getBlockTime(contract.chain, event.blockNumber);
    }

    const transactionHash = event.transactionHash;
    const blockNumber = event.blockNumber;

    const liquidityPool: LiquidityPool = {
      chain: contract.chain,
      protocol: contract.protocol,
      address: normalizeAddress(contract.address),
      tokens: [],
      fee: 3000,
      transactionHash: transactionHash,
      timestamp: timestamp,
      blockNumber: blockNumber,
    };

    const web3Helper = (await this.providers)
      ? this.providers.web3Helper
      : new Web3HelperProvider(this.providers.mongodb);
    switch (contract.type) {
      case 'univ2': {
        const token0 = await web3Helper.getErc20Metadata(contract.chain, event.token0);
        const token1 = await web3Helper.getErc20Metadata(contract.chain, event.token1);
        if (token0 && token1) {
          liquidityPool.tokens = [token0, token1];
        }
      }
    }

    return liquidityPool;
  }

  public async processEvents(contract: Contract, events: Array<any>, options: any): Promise<any> {
    const pools: Array<LiquidityPool> = [];

    for (const event of events) {
      const transformedPool: LiquidityPool | null = await this.parseEvent(contract as FactoryContract, event, options);
      if (transformedPool) {
        pools.push(transformedPool);
      }
    }

    const operations: Array<any> = [];
    for (const pool of pools) {
      operations.push({
        updateOne: {
          filter: {
            chain: pool.chain,
            protocol: pool.protocol,
            address: pool.address,
          },
          update: {
            $set: {
              ...pool,
            },
          },
          upsert: true,
        },
      });
    }
    if (operations.length > 0) {
      const collection = (await this.providers.mongodb.requireCollections()).factoryPoolsCollection;
      if (collection) {
        await collection.bulkWrite(operations);
      }
    }

    return operations.length;
  }
}
