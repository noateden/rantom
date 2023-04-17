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

    const name = argv.name;
    const contractWorkers = getContractWorkers(providers);

    if (!contractWorkers[name]) {
      process.exit(0);
    } else {
      while (true) {
        await contractWorkers[name].run({ fromBlock: argv.fromBlock ? Number(argv.fromBlock) : 0, fromTime: 0 });

        await sleep(60);
      }
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
    });
  }
}
