import { Router } from 'express';

import logger from '../../../lib/logger';
import { GlobalProviders } from '../../../types/namespaces';
import { writeResponseError } from '../helpers';

export function getRouter(providers: GlobalProviders): Router {
  const router = Router({ mergeParams: true });

  // return system status
  router.get('/overview', async (request, response) => {
    const systemStatus: any = {
      eventCount: {
        lending: 0,
        staking: 0,
        trading: 0,
        marketplace: 0,
        service: 0,
        erc20Supply: 0,
      },
      contractStates: [],
    };

    try {
      const collections = await providers.mongodb.requireCollections();

      systemStatus.eventCount.lending = await collections.lendingActionsCollection.estimatedDocumentCount();
      systemStatus.eventCount.staking = await collections.stakingActionsCollection.estimatedDocumentCount();
      systemStatus.eventCount.trading = await collections.tradingActionsCollection.estimatedDocumentCount();
      systemStatus.eventCount.marketplace = await collections.marketplaceActionsCollection.estimatedDocumentCount();
      systemStatus.eventCount.service = await collections.serviceActionsCollection.estimatedDocumentCount();
      systemStatus.eventCount.erc20Supply = await collections.erc20SupplyActionsCollection.estimatedDocumentCount();

      const states: Array<any> = await collections.statesCollection.find().toArray();
      for (const state of states) {
        const patterns = state.name.split('-');
        systemStatus.contractStates.push({
          chain: patterns[1],
          contract: patterns[2],
          blockNumber: state.blockNumber,
        });
      }

      response.status(200).json(systemStatus).end();
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
