import { PancakeswapConfigs, SushiConfigs } from '../../configs/protocols';
import { sleep } from '../../lib/helper';
import { SubgraphWorker } from '../../modules/worker/subgraph';
import { IWorkerProvider } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class SubgraphCommand extends BasicCommand {
  public readonly name: string = 'subgraph';
  public readonly describe: string = 'Query and parse logs from subgraph';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();

    const subgraphWorker: IWorkerProvider = new SubgraphWorker(providers, [SushiConfigs, PancakeswapConfigs]);

    while (true) {
      await subgraphWorker.run({ fromBlock: 0, fromTime: argv.fromTime ? Number(argv.fromTime) : 0 });
      await sleep(60);
    }
  }

  public setOptions(yargs: any) {
    return yargs.option({
      fromTime: {
        type: 'number',
        default: 0,
        describe: 'Run with given initial timestamp',
      },
    });
  }
}
