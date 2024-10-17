import { NextFunction, Request, Response } from 'express';

export async function verifySession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.session.user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  return next();
}
