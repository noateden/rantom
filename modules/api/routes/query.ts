import { Router } from 'express';

import logger from '../../../lib/logger';
import { ProtocolStats } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';
import { ApiWorkerProvider } from '../worker';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.post('/logs', async (request, response) => {
    const { query, options } = request.body;

    const order = options && options.order === 'oldest' ? 1 : -1;
    const limit = options && options.limit ? Number(options.limit) : 1000;
    const skip = options && options.skip ? Number(options.skip) : 0;

    const apiWorker = new ApiWorkerProvider(providers);

    try {
      const events: Array<any> = await apiWorker.queryLogs({ query, limit, order, skip });
      response.status(200).json(events).end();
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
  });

  router.get('/stats/protocol/:protocol', async (request, response) => {
    const { protocol } = request.params;

    const apiWorker = new ApiWorkerProvider(providers);

    try {
      const stats: ProtocolStats = await apiWorker.queryProtocolStats({ protocol });
      response.status(200).json(stats).end();
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
  });

  return router;
}
