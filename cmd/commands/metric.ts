import { sleep } from '../../lib/helper';
import { MetricProvider } from '../../modules/worker/metric';
import { IMetricProvider } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class MetricCommand extends BasicCommand {
  public readonly name: string = 'metric';
  public readonly describe: string = 'Run metrics wortker service';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();

    const metricProvider: IMetricProvider = new MetricProvider(providers);

    while (true) {
      await metricProvider.run();

      if (argv.exit) {
        process.exit(0);
      }

      await sleep(300);
    }
  }

  public setOptions(yargs: any) {
    return yargs.option({
      exit: {
        type: 'boolean',
        default: false,
        describe: 'Exit when done updating protocol stats',
      },
    });
  }
}
