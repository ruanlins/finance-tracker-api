import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { GetMonthCategoriesTransactionsUseCase } from "@/use-cases/transactions/get-month-categories-transactions";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function getMonthCategoriesTransactions(req: Request, res: Response, next: NextFunction) {
    const categoriesQuery = z.object({
        year: z.coerce.number().optional(),
        month: z.coerce.number().optional()
    })

    const parsedQuery = categoriesQuery.safeParse(req.query)

    if (!parsedQuery.success) {
        return next(createHttpError(400, {
            message: "Erro de validação nos parâmetros da query",
            details: parsedQuery.error.errors
        }))
    }

    if (!req.user?.id) {
        return next(createHttpError(401, "Usuário não autenticado"));
    }

    const {month, year} = parsedQuery.data
    const user_id = req.user.id

    try{
        const transactionsRepository = new PrismaTransactionsRepository()
        const getMonthCategoriesTransactions = new GetMonthCategoriesTransactionsUseCase(transactionsRepository)

        const {categories} = await getMonthCategoriesTransactions.execute({user_id, month, year})

        res.status(200).json({Gastos: categories})
    }
    catch(err) {
        next(err)
    }


}