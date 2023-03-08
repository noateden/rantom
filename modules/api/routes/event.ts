import BigNumber from 'bignumber.js';
import { Router } from 'express';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/:family/:protocol', async (request, response) => {
    const { family, protocol } = request.params;

    const order = request.query && request.query.order === 'oldest' ? 1 : -1;
    const limit = new BigNumber(
      request.query && request.query.limit ? request.query.limit.toString() : '1000'
    ).toNumber();
    const skip = new BigNumber(request.query && request.query.skip ? request.query.skip.toString() : '0').toNumber();

    if (family !== 'lending' && family !== 'marketplace' && family !== 'staking') {
      writeResponseError(response, {
        status: 400,
        error: `unsupported family ${family}`,
      });
    } else {
      try {
        const collections = await providers.mongodb.requireCollections();
        const collection =
          family === 'lending'
            ? collections.lendingActionsCollection
            : family === 'marketplace'
            ? collections.marketplaceActionsCollection
            : collections.stakingActionsCollection;
        const events: Array<any> = await collection
          .find({
            protocol: protocol,
          })
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
