import { Router } from 'express';

import { ApiQueryLogsLimitDefault } from '../../../configs';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { Actions } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/query', async (request, response) => {
    const limit = request.query.limit ? Number(request.query.limit) : ApiQueryLogsLimitDefault;
    const skip = request.query.skip ? Number(request.query.skip) : 0;
    const order = request.query.order === 'oldest' ? 1 : -1;

    let query: any = {};

    if (request.query.protocol) {
      query.protocol = request.query.protocol;
    }

    if (request.query.action) {
      query.action = { $in: [request.query.action] };
    } else {
      query.action = { $in: Actions };
    }

    if (request.query.token) {
      query['tokens.address'] = normalizeAddress(request.query.token.toString());
    }

    if (!query.protocol && !query['tokens.address']) {
      response.status(200).json([]);
    } else {
      try {
        const collections = await providers.mongodb.requireCollections();
        const activities: Array<any> = await collections.logsCollection
          .find(query)
          .sort({
            timestamp: order,
          })
          .limit(limit)
          .skip(skip)
          .toArray();

        const returnActivities: Array<any> = [];
        for (const activity of activities) {
          delete activity._id;
          returnActivities.push(activity);
        }

        response.status(200).json(returnActivities);
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
