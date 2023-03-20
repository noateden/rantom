import { Router } from 'express';
import { Collection } from 'mongodb';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.post('/custom', async (request, response) => {
    const { module, query, options } = request.body;

    const collections = await providers.mongodb.requireCollections();
    let collection: Collection | null = null;
    if (module === 'lending') {
      collection = collections.lendingActionsCollection;
    } else if (module === 'trading') {
      collection = collections.tradingActionsCollection;
    } else if (module === 'staking') {
      collection = collections.stakingActionsCollection;
    } else if (module === 'marketplace') {
      collection = collections.marketplaceActionsCollection;
    } else {
      writeResponseError(response, {
        status: 400,
        error: `unsupported module ${module}`,
      });
    }

    if (collection) {
      const order = options && options.order === 'oldest' ? 1 : -1;
      const limit = options && options.limit ? Number(options.limit) : 1000;
      const skip = options && options.skip ? Number(options.skip) : 0;

      try {
        const events: Array<any> = await collection
          .find(query)
          .limit(limit)
          .skip(skip)
          .sort({ timestamp: order })
          .toArray();
        const returnValues: Array<any> = [];
        for (const event of events) {
          delete event._id;
          returnValues.push(event);
        }
        response.status(200).json(returnValues).end();
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
