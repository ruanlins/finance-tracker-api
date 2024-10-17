import { Request, Response } from 'express';

export async function userLogout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send();
    }
    res.sendStatus(200);
  });
}
