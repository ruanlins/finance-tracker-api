import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { SetValueUseUseCase } from "@/use-cases/wallets/set-value";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function walletChangeTotal(req: Request, res: Response, next: NextFunction) {
    const changeValueBody = z.object({
        total: z.number(),
    })

    const parsedBody = changeValueBody.safeParse(req.body)
    if (!parsedBody.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedBody.error.errors
        }));
    }

    const changeValueParams = z.object({
        wallet_id: z.string()
    })
    const parsedParams = changeValueParams.safeParse(req.params)
    if (!parsedParams.success) {
        return next(createHttpError(400, {
            message: "Erro de validação dos parametros",
            details: parsedParams.error.errors
        }))
    }

    const { total } = parsedBody.data
    const { wallet_id } = parsedParams.data

    try {
        const walletsRepository = new PrismaWalletsRepository()
        const setValueUseCase = new SetValueUseUseCase(walletsRepository)

        const { wallet } = await setValueUseCase.execute({ total, wallet_id })

        res.status(200).json({ message: 'Total editado com sucesso.', wallet })

    } catch (err) {
        next(err)
    }
}