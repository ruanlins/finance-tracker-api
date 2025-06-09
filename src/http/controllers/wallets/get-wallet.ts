import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { WalletNotFoundError } from "@/use-cases/erros/wallet-not-found-error";
import { GetWalletUseCase } from "@/use-cases/wallets/get-wallet";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function getWallet(req: Request, res: Response, next: NextFunction) {
    const getWalletParams = z.object({
        wallet_id: z.string()
    })

    const parsedParams = getWalletParams.safeParse(req.params)

    if (!parsedParams.success) {
        return next(createHttpError(400,
            {
                message: 'Erro na validação dos parâmentros',
                details: parsedParams.error.errors
            }
        ))
    }

    const { wallet_id } = parsedParams.data

    try {

        const walletsRepository = new PrismaWalletsRepository()
        const getWalletUseCase = new GetWalletUseCase(walletsRepository)

        const { wallet } = await getWalletUseCase.execute({ wallet_id })

        res.status(200).json({ wallet })

    } catch (err) {
        if (err instanceof WalletNotFoundError) {
            return next(createHttpError(404, err.message))
        }
        return next(err)
    }
}