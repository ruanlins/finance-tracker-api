import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { GetTransactionsUseCase } from "@/use-cases/transactions/get-transactions";
import { TransactionCategory } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function getTransactions(req: Request, res: Response, next: NextFunction) {
    const transactionsQuery = z.object({
        page: z.coerce.number().optional(),
        offset: z.coerce.number().optional(),
        category: z.nativeEnum(TransactionCategory).optional(),
        query: z.string().optional(),
        year: z.coerce.number().optional(),
        month: z.coerce.number().optional(),
    })

    const parsedQuery = transactionsQuery.safeParse(req.query)

    if (!parsedQuery.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedQuery.error.errors
        }))
    }

    const params = parsedQuery.data
    const user_id = req.user?.id as string

    try {
        const transactionsRepository = new PrismaTransactionsRepository()
        const getTransactionsUseCase = new GetTransactionsUseCase(transactionsRepository)


        const {transactions} = await getTransactionsUseCase.execute({user_id, params})

        res.status(200).send({transactions})

    } catch (error) {
        next(error)
    }

}