import { ReportProvider } from '../../modules/worker/reporter';
import { IReportProvider } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class ReportCommand extends BasicCommand {
  public readonly name: string = 'report';
  public readonly describe: string = 'Run system reports service';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers = await super.getProviders();

    const reportProvider: IReportProvider = new ReportProvider(providers);
    await reportProvider.run();
  }
}
