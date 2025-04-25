import { Transaction, Prisma } from "@prisma/client";
import { TransactionsRepository } from "../transactions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionsRepository implements TransactionsRepository{
    async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transaction.findUnique({where:{id}})

        return transaction
    }

    async findByUserId(id: string): Promise<Transaction[]> {
        const transactions = prisma.transaction.findMany({where:{user_id:id}})

        return transactions
    }

   async create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction> {
        const transaction = prisma.transaction.create({data})

        return transaction
    }

    async edit(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction> {
        const transaction = prisma.transaction.update({where:{id}, data} )

        return transaction
    }

    async delete(id: string): Promise<null> {
        await prisma.transaction.delete({where:{id}})

        return null
    }

}