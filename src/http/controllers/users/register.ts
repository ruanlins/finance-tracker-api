import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { RegisterUseCase } from '@/use-cases/users/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import jwt from 'jsonwebtoken'
import { env } from '@/env'
import { UserAlreadyExistsError } from '@/use-cases/erros/user-alreay-exists-error'
import createHttpError from 'http-errors'

export async function userRegister(req:Request, res:Response, next:NextFunction) {
    const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const parsedBody  = registerBodySchema.safeParse(req.body)
  if (!parsedBody .success) {
    res.status(400).json({
      mensagem: 'Erro de validação',
      erros: parsedBody.error.errors,
    })
    return
  }

    const { name, email, password } = parsedBody .data

    
    try {
        const usersRepository = new PrismaUsersRepository()
        const walletsRepository = new PrismaWalletsRepository()
        const registerUseCase = new RegisterUseCase(
          usersRepository,
          walletsRepository
        )
    
        const { user } = await registerUseCase.execute({ name, email, password })
    
        const token = jwt.sign({sub: user.id}, env.JWT_SECRET, { expiresIn: '1d' })
    
        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          secure: env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24,
        })
    
        res.status(201).json({
          mensagem: 'Usuário registrado com sucesso',
          usuario: {
            nome: user.name,
            email: user.email,
          },
        })

      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          next(createHttpError(409, err.message))
        }
        return next(err)
      }
  }
