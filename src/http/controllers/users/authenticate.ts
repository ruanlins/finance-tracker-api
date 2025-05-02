import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import jwt from 'jsonwebtoken'
import {env} from '@/env/index'
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import createHttpError from "http-errors";

export async function userAuthenticate(req: Request, res: Response, next:NextFunction) {
    const authenticateBody = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const parsedBody  = authenticateBody.safeParse(req.body)
    if (!parsedBody .success) {
    res.status(400).json({
      mensagem: 'Erro de validação',
      erros: parsedBody.error.errors,
    })
    return
    }

    const {email, password} = parsedBody.data

    try {
      const usersRepository = new PrismaUsersRepository()
      const authenticateUseCase = new AuthenticateUseCase(usersRepository)

      const {user} = await authenticateUseCase.execute({email, password})

      const token = jwt.sign({sub: user.id}, env.JWT_SECRET, { expiresIn: '1d' })

      res.cookie('token', token, {
        httpOnly: env.NODE_DEV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
      })

      res.status(200).json({
        mensagem: 'Login efetuado com sucesso.',
        usuario: {
          nome: user.name,
          email: user.email,
        },
      })
      
      
    } catch (err) {
      if(err instanceof InvalidCredentialsError){
        createHttpError(401, err.message)
      }
      next(err)
    }
}