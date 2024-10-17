import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { Request, Response } from 'express';

export async function userGetProfile(req: Request, res: Response) {
  const loggedUser = req.session.user;
  try {
    if (!loggedUser) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    return res.status(200).send({ user: loggedUser });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'Internal server error.' });
  }
}
