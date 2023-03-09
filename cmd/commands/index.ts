import { sleep, stringReplaceAll } from '../../lib/helper';
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
      const names: Array<string> = argv.name.split(',');

      while (true) {
        for (let name of names) {
          name = stringReplaceAll(name, ' ', '');
          if (workers[name]) {
            await workers[name].run();
          }
        }
        await sleep(120);
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
  }

  public setOptions(yargs: any) {
    return yargs.option({
      chain: {
        type: 'string',
        default: 'name',
        describe: 'Run worker with given name list: aave,lido',
      },
    });
  }
}
