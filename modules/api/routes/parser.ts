import { HttpStatusCode } from 'axios';
import { Router } from 'express';

import TransactionParser from '../../../modules/parser/transaction';
import { ContextServices } from '../../../types/namespaces';
import { writeResponse } from '../middleware';

export function getRouter(services: ContextServices): Router {
  const router = Router({ mergeParams: true });

  router.get('/fetch/:transactionHash', async (request, response) => {
    try {
      const { transactionHash } = request.params;
      const chain = request.query.chain ? request.query.chain.toString() : undefined;

      const parser = new TransactionParser(services);
      const transactions = await parser.fetchTransaction({
        chain: chain,
        hash: transactionHash,
      });

      await writeResponse(services, request, response, HttpStatusCode.Ok, transactions);
    } catch (e: any) {
      await writeResponse(services, request, response, HttpStatusCode.InternalServerError, {
        error: 'server error',
      });
      console.log(e);
    }
  });

  router.get('/parse/:transactionHash', async (request, response) => {
    try {
      const { transactionHash } = request.params;
      const chain = request.query.chain ? request.query.chain.toString() : undefined;

      const parser = new TransactionParser(services);
      const transactionInsights = await parser.parseTransaction({
        chain: chain,
        hash: transactionHash,
      });

      await writeResponse(services, request, response, HttpStatusCode.Ok, transactionInsights);
    } catch (e: any) {
      await writeResponse(services, request, response, HttpStatusCode.InternalServerError, {
        error: 'server error',
      });
      console.log(e);
    }
  });

  return router;
}
