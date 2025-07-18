import { NextFunction, Request, Response } from "express";
import { TransactionCategory, TransactionMethod, TransactionType } from "@prisma/client";
import { z } from "zod";
import createHttpError from "http-errors";
import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { EditTransactionUseCase } from "@/use-cases/transactions/edit";
import { UnauthorizedError } from "@/use-cases/erros/unauthorized- error";
import { TransactionNotFoundError } from "@/use-cases/erros/transaction-not-found-error";

export async function updateTransaction(req: Request, res: Response, next: NextFunction) {
    const updateBody = z.object({
        amount: z.number().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        category: z.nativeEnum(TransactionCategory).optional(),
        method: z.nativeEnum(TransactionMethod).optional(),
        date: z.date().optional(),
        type: z.nativeEnum(TransactionType).optional(),
        id: z.string(),
        user_id: z.string(),
    })

    const parsedBody = updateBody.safeParse(req.body)

    if (!parsedBody.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedBody.error.errors
        }))
    }

    const updateParams = z.object({
        transaction_id: z.string()
    })

    const parsedParams = updateParams.safeParse(req.params)

    if (!parsedParams.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedParams.error.errors
        }))

    }

    if (!req.user?.id) {
        return next(createHttpError(401, "Usuário não autenticado"));
    }


    const data = parsedBody.data
    const user_id = req.user.id as string

    try {
        const transactionsRepository = new PrismaTransactionsRepository()
        const updateTransactionUseCase = new EditTransactionUseCase(transactionsRepository)

        const { transaction } = await updateTransactionUseCase.execute({ request: data, user_id })

        res.status(200).send({ transaction })

    } catch (err) {

        if (err instanceof UnauthorizedError) {
            return next(createHttpError(401, err.message))
        }

        if (err instanceof TransactionNotFoundError) {
            return next(createHttpError(404, err.message))
        }

        return next(err)
    }
}