import { Router } from 'express';

import { ApiQueryLogsLimitDefault } from '../../../configs';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import {
  Actions,
  AddressStats,
  ProtocolDailyStats,
  ProtocolSnapshotStats,
  ProtocolStats,
} from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { MetricProvider } from '../../worker/metric';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.post('/logs', async (request, response) => {
    const { filters, options } = request.body;

    const order = options && options.order === 'oldest' ? 1 : -1;
    const limit = options && options.limit ? Number(options.limit) : ApiQueryLogsLimitDefault;
    const skip = options && options.skip ? Number(options.skip) : 0;

    let query: any = {};

    if (filters && filters.protocol) {
      query.protocol = filters.protocol;
    }

    if (filters && filters.protocols) {
      query.protocol = { $in: filters.protocols };
    }

    if (filters && filters.actions) {
      query.action = { $in: filters.actions };
    } else {
      // query all actions
      query.action = { $in: Actions };
    }

    if (filters && filters.token) {
      query['tokens.address'] = normalizeAddress(filters.token.toString());
    }

    if (filters && filters.address) {
      query.addresses = normalizeAddress(filters.address.toString());
    }

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
  });

  router.get('/stats/protocol/:protocol', async (request, response) => {
    const { protocol } = request.params;

    const metricWorker = new MetricProvider(providers);

    try {
      const stats: ProtocolStats | null = await metricWorker.getProtocolStats(protocol);
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

  router.get('/metrics/protocol/:protocol', async (request, response) => {
    const { protocol } = request.params;

    const metricWorker = new MetricProvider(providers);

    try {
      const dailyStats: ProtocolDailyStats | null = await metricWorker.getProtocolDailyStats(protocol);
      const snapshotsStats: Array<ProtocolSnapshotStats> = await metricWorker.getProtocolSnapshotStats(protocol);
      response
        .status(200)
        .json({
          dailyStats,
          snapshotsStats,
        })
        .end();
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

  router.get('/stats/address/:address', async (request, response) => {
    const { address } = request.params;

    const metricWorker = new MetricProvider(providers);

    try {
      const stats: AddressStats | null = await metricWorker.getAddressStats(address);
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
