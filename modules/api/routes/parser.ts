import { Router } from 'express';

import EnvConfig from '../../../configs/envConfig';
import { getTimestamp } from '../../../lib/helper';
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

        // log the request into database for analytic later
        const remoteAddress = request.header('CF-Connecting-IP')
          ? request.header('CF-Connecting-IP')
          : request.socket.remoteAddress;
        const uerAgent = request.header('User-Agent');

        const collection = await providers.mongodb.getCollection(EnvConfig.mongodb.collections.apiLogs);
        await collection.insertOne({
          hash: hash,
          timestamp: getTimestamp(),
          remoteAddress: remoteAddress,
          userAgent: uerAgent,
        });
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
