import { sleep } from '../../lib/helper';
import { getWorkers } from '../../modules/worker';
import { IContractWorker } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class IndexCommand extends BasicCommand {
  public readonly name: string = 'index';
  public readonly describe: string = 'Run contract event workers';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();
    const workers: { [key: string]: IContractWorker } = getWorkers(providers);

    if (argv.name) {
      if (workers[argv.name]) {
        while (true) {
          await workers[argv.name].run();
          await sleep(120);
        }
      }
    } else {
      while (true) {
        for (const [, worker] of Object.entries(workers)) {
          await worker.run();
          await sleep(5);
        }
        await sleep(120);
      }
    }

    process.exit(0);
  }

  public setOptions(yargs: any) {
    return yargs.option({
      chain: {
        type: 'string',
        default: 'name',
        describe: 'Run worker with given name: aave',
      },
    });
  }
}
