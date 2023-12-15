import { Router } from 'express';

import { ContextServices } from '../../types/namespaces';
import { middleware } from './middleware';
import * as actionRouter from './routes/action';
import * as parserRouter from './routes/parser';

export function getRouter(services: ContextServices): Router {
  const router = Router({ mergeParams: true });

  router.use('/', middleware);

  // public
  router.use('/parser', parserRouter.getRouter(services));
  router.use('/action', actionRouter.getRouter(services));

  return router;
}

export default getRouter;
