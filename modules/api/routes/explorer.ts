import { Router } from 'express';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { ExplorerProvider } from '../../explorer';
import { ParserProvider } from '../../parser';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/explore/:chain', async (request, response) => {
    const { chain } = request.params;

    // support ethereum only for now
    if (chain === 'ethereum') {
      try {
        const parser = new ParserProvider(providers);
        const explorer = new ExplorerProvider(parser);
        const transactions = await explorer.exploreLatestTransactions({ chain });
        response.status(200).json(transactions).end();
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
    } else {
      writeResponseError(response, {
        status: 400,
        error: `unsupported chain ${chain}`,
      });
    }
  });

  return router;
}
