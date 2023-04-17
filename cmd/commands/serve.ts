import cors from 'cors';
import express from 'express';
import path from 'path';

import logger from '../../lib/logger';
import getRouter from '../../modules/api';
import { SmartApiProvider } from '../../modules/worker/smartapi';
import { GlobalProviders } from '../../types/namespaces';
import { BasicCommand } from '../basic';

export class ServeCommand extends BasicCommand {
  public readonly name: string = 'serve';
  public readonly describe: string = 'Serve restful API server';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const providers: GlobalProviders = await super.getProviders();

    const router = getRouter(providers);
    const smartApi = new SmartApiProvider(providers);

    const port = argv.port || process.env.PORT || '8080';

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/v1', router);

    app.use('/', express.static(path.join('.', 'public')));

    app.listen(port, () => {
      logger.onInfo({
        service: 'api',
        message: 'started rest API service',
        props: {
          address: `0.0.0.0:${port}`,
        },
      });
    });

    await smartApi.run();
  }

  public setOptions(yargs: any) {
    return yargs.option({
      port: {
        type: 'number',
        default: 0,
        describe: 'The port number to listen',
      },
    });
  }
}
