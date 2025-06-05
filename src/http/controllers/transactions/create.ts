import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { PrismaWalletsRepository } from "@/repositories/prisma/prisma-wallets-repository";
import { TransactionMustHaveAmountAndDescriptionError } from "@/use-cases/erros/transaction-must-have-amount-and-description-error";
import { CreateTransactionUseCase } from "@/use-cases/transactions/create";
import { TransactionCategory, TransactionMethod, TransactionType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    const createTransactionBody = z.object({
        amount: z.number(),
        description: z.string(),
        location: z.string().optional(),
        category: z.nativeEnum(TransactionCategory),
        method: z.nativeEnum(TransactionMethod),
        date: z.date().optional(),
        type: z.nativeEnum(TransactionType),
        wallet_id: z.string()
    })

    const parsedBody = createTransactionBody.safeParse(req.body)

    if (!parsedBody.success) {
        return next(createHttpError(400, {
            message: "Erro de validação no corpo da requisição",
            details: parsedBody.error.errors
        }))
    }

     if (!req.user?.id) {
        return next(createHttpError(401, "Usuário não autenticado"));
      }

    const { amount, description, location, category, date, type, wallet_id, method } = parsedBody.data
    const user_id = req.user.id as string

    try {
        const transactionsRepository = new PrismaTransactionsRepository()
        const walletsRepository = new PrismaWalletsRepository()
        const createTransactionUseCase = new CreateTransactionUseCase(transactionsRepository, walletsRepository)

        const { transaction } = await createTransactionUseCase.execute({ amount, description, location, category, date, type, method, wallet_id, user_id })

        res.status(201).json({mensagem:'Transação cadastrada', transaction})

    } catch (err) {
        if(err instanceof TransactionMustHaveAmountAndDescriptionError) {
            return next(createHttpError(400, err.message))
        }
        return next(err)
    }






}