import { Router } from 'express';

import { normalizeAddress } from '../../../lib/helper';
import { GlobalProviders } from '../../../types/namespaces';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  router.get('/spot/:chain/:address', async (request, response) => {
    const chain = request.params.chain;
    const address = request.params.address;
    const timestamp = request.query.timestamp ? Number(request.query.timestamp) : 0;

    const result = await providers.oracle.getTokenSpotPriceUsd({
      chain,
      address: normalizeAddress(address),
      timestamp,
    });
    response.status(200).json(result).end();
  });

  return router;
}
