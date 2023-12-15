import { NextFunction, Request, Response } from 'express';

import logger from '../../lib/logger';
import { ContextServices } from '../../types/namespaces';
import { getRequestIp } from './helper';

export function middleware(request: Request, response: Response, next: NextFunction) {
  (request as any).requestTimestamp = new Date().getTime();

  next();
}

export async function writeResponse(
  services: ContextServices,
  request: Request,
  response: Response,
  status: number,
  data: any
) {
  const elapsed = new Date().getTime() - (request as any).requestTimestamp;

  logger.info('served api request', {
    service: 'api',
    method: request.method,
    path: `${request.baseUrl}${request.path}`,
    status: status,
    elapsed: `${elapsed}ms`,
    ip: getRequestIp(request),
  });

  response.status(status).json(data);
}
