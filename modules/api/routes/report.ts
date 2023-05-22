import { Router } from 'express';

import EnvConfig from '../../../configs/envConfig';
import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { ReportProvider } from '../../worker/reporter';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/system', async (request, response) => {
    const key = request.query.key;
    if (key !== EnvConfig.security.systemApiKey) {
      writeResponseError(response, {
        status: 401,
        error: 'invalid api key',
      });
    } else {
      const reportProvider = new ReportProvider(providers);

      try {
        const reports = await reportProvider.getSystemReport();
        response.status(200).json(reports);
      } catch (e: any) {
        logger.onError({
          service: 'api',
          message: 'failed to serve api request',
          props: {
            path: request.path,
            error: e.message,
          },
          error: e as Error,
        });
        writeResponseError(response, {
          status: 500,
          error: 'internal server error',
        });
      }
    }
  });

  return router;
}
