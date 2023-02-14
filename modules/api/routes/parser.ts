import { Router } from 'express';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { ParserProvider } from '../../parser';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/parse/:hash', async (request, response) => {
    const { hash } = request.params;
    const { force } = request.query;

    if (!hash) {
      writeResponseError(response, {
        status: 400,
        error: 'invalid transaction hash',
      });
    } else {
      try {
        const parser = new ParserProvider(providers);
        const transaction = await parser.parseTransaction({ hash, force: Boolean(force) });

        response.status(200).json(transaction).end();
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
