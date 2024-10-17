import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function userRegister(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const { user } = await registerUseCase.execute({ name, email, password });

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }
    return res.status(500).send();
  }

  return res.status(201).send(req.session.user);
}
