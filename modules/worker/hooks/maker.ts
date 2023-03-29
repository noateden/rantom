import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { MakerConfigs } from '../../../configs/protocols';
import { Contract } from '../../../types/configs';
import { GlobalProviders, IAdapter } from '../../../types/namespaces';
import { MakerAdapter } from '../../adapters/maker/maker';
import { LendingWorkerHook } from '../extends/lending';

export class MakerWorkerHook extends LendingWorkerHook {
  public readonly name: string = 'worker.maker';

  constructor(providers: GlobalProviders, contracts: Array<Contract>) {
    super(providers, contracts);
  }

  public getAdapter(): IAdapter | null {
    return new MakerAdapter(MakerConfigs, this.providers);
  }

  protected async getPasEvents(config: Contract, fromBlock: number, toBlock: number): Promise<Array<any>> {
    if (!config.topics) {
      return await super.getPasEvents(config, fromBlock, toBlock);
    } else {
      // get custom events
      const web3 = new Web3(EnvConfig.blockchains[config.chain].nodeRpc);

      let events: Array<any> = [];
      for (const topic of config.topics) {
        const logs = await web3.eth.getPastLogs({
          address: config.address,
          fromBlock,
          toBlock,
          topics: [topic],
        });
        for (const log of logs) {
          events.push({
            ...log,
            raw: {
              topics: log.topics,
              data: log.data,
            },
          });
        }
      }

      return events;
    }
  }
}
