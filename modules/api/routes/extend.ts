import BigNumber from 'bignumber.js';
import { Router } from 'express';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/erc20Supply', async (request, response) => {
    const order = request.query && request.query.order === 'oldest' ? 1 : -1;
    const limit = new BigNumber(
      request.query && request.query.limit ? request.query.limit.toString() : '1000'
    ).toNumber();
    const skip = new BigNumber(request.query && request.query.skip ? request.query.skip.toString() : '0').toNumber();

    try {
      const collections = await providers.mongodb.requireCollections();

      const events: Array<any> = await collections.erc20SupplyActionsCollection
        .find({})
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
  });

  return router;
}
