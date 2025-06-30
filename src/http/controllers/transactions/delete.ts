import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { TransactionNotFoundError } from "@/use-cases/erros/transaction-not-found-error";
import { UnauthorizedError } from "@/use-cases/erros/unauthorized- error";
import { DeleteTransactionUseCase } from "@/use-cases/transactions/delete";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    const deleteParams = z.object({
        transaction_id: z.string()
    })

    const parsedParams = deleteParams.safeParse(req.params)

    if (!parsedParams.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedParams.error.errors
        }))
    }

    if (!req.user?.id) {
        return next(createHttpError(401, "Usuário não autenticado"));
    }

    const {transaction_id} = parsedParams.data
    const user_id = req.user.id

    try {
        const transactionsRepository = new PrismaTransactionsRepository()
        const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionsRepository)

        await deleteTransactionUseCase.execute({transaction_id, user_id})

        res.status(200).json('Transação apagada com sucesso.')


    } catch (err) {
        if(err instanceof UnauthorizedError){
            return next(createHttpError(401, err.message))
        }
        if(err instanceof TransactionNotFoundError){
            return next(createHttpError(404, err.message))
        }
        return next(err)
    }
}