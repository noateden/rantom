import { NextFunction, Request, Response } from 'express';

import logger from '../../lib/logger';

export function logMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.onInfo({
    service: 'api',
    message: 'serving api request',
    props: {
      method: request.method,
      path: request.path,
      remoteAddress: `${request.socket.remoteFamily}:${request.socket.remoteAddress}`,
    },
  });

  next();
}
