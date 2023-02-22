import { ParserProvider } from '../../modules/parser';
import { WorkerProvider } from '../../modules/worker';
import { BasicCommand } from '../basic';

export class WorkerCommand extends BasicCommand {
  public readonly name: string = 'worker';
  public readonly describe: string = 'Run transactions explorer worker';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();
    const parserProvider = new ParserProvider(null);

    const worker = new WorkerProvider(parserProvider, providers);
    await worker.run({ chain: argv.chain });

    process.exit(0);
  }

  public setOptions(yargs: any) {
    return yargs.option({
      chain: {
        type: 'string',
        default: 'ethereum',
        describe: 'Run worker with given chain: ethereum',
      },
    });
  }
}
