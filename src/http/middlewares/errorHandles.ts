import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export function errorHandler(err: HttpError | Error, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof HttpError ? err.message : 'Erro interno do servidor';

  res.status(status).json({ status, message });
}