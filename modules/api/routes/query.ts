import { Router } from 'express';

import { createDataHash } from '../../../lib/crypto';
import { getTimestamp } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.post('/logs', async (request, response) => {
    const { query, options } = request.body;

    const collections = await providers.mongodb.requireCollections();
    const order = options && options.order === 'oldest' ? 1 : -1;
    const limit = options && options.limit ? Number(options.limit) : 1000;
    const skip = options && options.skip ? Number(options.skip) : 0;

    try {
      // check the caching data first
      const cachingKey = `query-${createDataHash(
        JSON.stringify({
          query,
          order,
          limit,
          skip,
        })
      )}`;
      const logs = await collections.cachingCollection.find({ name: cachingKey }).limit(1).toArray();
      if (logs.length > 0) {
        const caching = logs[0];
        const currentTime = getTimestamp();
        if (caching.timestamp && currentTime - caching.timestamp <= 600) {
          logger.onInfo({
            service: 'api',
            message: 'caching data hit',
            props: {
              name: cachingKey,
              timestamp: caching.timestamp,
              events: caching.events.length,
            },
          });
          response.status(200).json(caching.events).end();
          return;
        }
      }

      const events: Array<any> = await collections.logsCollection
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

      await collections.cachingCollection.updateOne(
        {
          name: cachingKey,
        },
        {
          $set: {
            timestamp: getTimestamp(),
            events: events,
          },
        },
        { upsert: true }
      );

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
