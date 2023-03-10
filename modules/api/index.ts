import { Router } from 'express';

import { GlobalProviders } from '../../types/namespaces';
import { logMiddleware } from './middleware';
import * as eventRouter from './routes/event';
import * as extendRouter from './routes/extend';
import * as parserRouter from './routes/parser';
import * as statusRouter from './routes/status';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.use('/', logMiddleware);

  router.use('/parser', parserRouter.getRouter(providers));
  router.use('/event', eventRouter.getRouter(providers));
  router.use('/extend', extendRouter.getRouter(providers));
  router.use('/status', statusRouter.getRouter(providers));

  return router;
}

export default getRouter;
