import { Response } from 'express';

export interface WriteResponseErrorProps {
  status: number;
  error: string;
}
export function writeResponseError(response: Response, data: WriteResponseErrorProps) {
  response.status(data.status).json({
    error: data.error,
    data: null,
  });
}
