import { Router } from 'express';

import { GlobalProviders } from '../../types/namespaces';
import { logMiddleware } from './middleware';
import * as oracleRouter from './routes/oracle';
import * as parserRouter from './routes/parser';
import * as queryRouter from './routes/query';
import * as reportRouter from './routes/report';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.use('/', logMiddleware);

  router.use('/parser', parserRouter.getRouter(providers));
  router.use('/query', queryRouter.getRouter(providers));
  router.use('/oracle', oracleRouter.getRouter(providers));
  router.use('/report', reportRouter.getRouter(providers));

  return router;
}

export default getRouter;
