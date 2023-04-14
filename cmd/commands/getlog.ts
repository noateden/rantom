import { sleep } from '../../lib/helper';
import { GetlogWorker } from '../../modules/worker/getlog';
import { IWorkerProvider } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class GetlogCommand extends BasicCommand {
  public readonly name: string = 'getlog';
  public readonly describe: string = 'Query and parse logs block by block';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();

    const blockWorker: IWorkerProvider = new GetlogWorker(providers);

    while (true) {
      await blockWorker.run({ fromBlock: argv.fromBlock ? Number(argv.fromBlock) : 0, fromTime: 0 });
      await sleep(60);
    }
  }

  public setOptions(yargs: any) {
    return yargs.option({
      chain: {
        type: 'string',
        default: 'ethereum',
        describe: 'Run with given blockchain, supported: ethereum',
      },
      fromBlock: {
        type: 'number',
        default: 0,
        describe: 'Run with given initial block number',
      },
    });
  }
}
