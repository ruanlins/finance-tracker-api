import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { GetMonthTransactionsUseCase } from "@/use-cases/transactions/get-month-transactions";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export async function getMonthTransactions(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) {
        return next(createHttpError(401, "Usuário não autenticado"));
    }

    try {
        const transactionsRepository = new PrismaTransactionsRepository()
        const getMonthTransactions = new GetMonthTransactionsUseCase(transactionsRepository)

        const {total} = await getMonthTransactions.execute({user_id:req.user.id})

        res.status(200).json({total})
    } catch (err) {
        next(err)
    }
}