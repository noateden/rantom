import { Request } from 'express';

export function getRequestIp(request: Request): string {
  return request.header('CF-Connecting-IP')
    ? String(request.header('CF-Connecting-IP'))
    : `${request.socket.remoteAddress}`;
}
