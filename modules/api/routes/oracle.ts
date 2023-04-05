import { Router } from 'express';

import { getTimestamp } from '../../../lib/helper';
import { GlobalProviders } from '../../../types/namespaces';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/spot/:symbol', async (request, response) => {
    const symbol = request.params.symbol;
    const timestamp = request.query.timestamp ? Number(request.query.timestamp) : getTimestamp();

    const result = await providers.oracle.getTokenSpotPriceUsd({ symbol, timestamp });
    response.status(200).json(result).end();
  });

  return router;
}
