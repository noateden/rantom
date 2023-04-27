import { sleep } from '../../lib/helper';
import { getContractWorkers } from '../../modules/worker';
import { BasicCommand } from '../basic';

export class IndexCommand extends BasicCommand {
  public readonly name: string = 'index';
  public readonly describe: string = 'Index events from given contracts';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();

    const names = argv.name ? argv.name.toString().split(',') : [];
    while (true) {
      for (const name of names) {
        const contractWorkers = getContractWorkers(providers);
        if (contractWorkers[name]) {
          await contractWorkers[name].run({
            force: argv.force,
            fromBlock: argv.fromBlock ? Number(argv.fromBlock) : 0,
            fromTime: 0,
          });
        }
      }

      if (argv.exit) {
        process.exit(0);
      }

      await sleep(60);
    }
  }

  public setOptions(yargs: any) {
    return yargs.option({
      name: {
        type: 'string',
        default: '',
        describe: 'Run with given name configs',
      },
      fromBlock: {
        type: 'number',
        default: 0,
        describe: 'Run with given initial block number',
      },
      force: {
        type: 'boolean',
        default: false,
        describe: 'Force get events from birthday config',
      },
      exit: {
        type: 'boolean',
        default: true,
        describe: 'Exit when catching up with network blocks',
      },
    });
  }
}
