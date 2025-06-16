import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { GetWalletsUseCase } from "@/use-cases/wallets/get-wallets";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function getWallets(req: Request, res: Response, next: NextFunction) {
    const reqUserSchema = z.object({
        id: z.string()
    })

    const parsedUserId = reqUserSchema.safeParse(req.user)

    if (!parsedUserId.success) {
        return next(createHttpError(401,
            {
                message: 'Erro na validação do usuário',
                details: parsedUserId.error.errors
            }
        ))
    }

    const { id } = parsedUserId.data

    try {

        const walletsRepository = new PrismaWalletsRepository()
        const getWalletsUseCase = new GetWalletsUseCase(walletsRepository)

        const { wallets } = await getWalletsUseCase.execute({ user_id: id })

        res.status(200).json({ wallets })

    } catch (err) {
        next(err)
    }

}