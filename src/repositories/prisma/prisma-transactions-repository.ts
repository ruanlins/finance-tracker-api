import { Transaction, Prisma } from "@prisma/client";
import { TransactionsRepository } from "../transactions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionsRepository implements TransactionsRepository {
    async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transaction.findUnique({ where: { id } })

        return transaction
    }

    async findByUserId(id: string): Promise<Transaction[]> {
        const transactions = prisma.transaction.findMany({ where: { user_id: id } })

        return transactions
    }

    async create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction> {
        const transaction = prisma.transaction.create({ data })

        return transaction
    }

    async edit(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction> {
        const transaction = prisma.transaction.update({ where: { id }, data })

        return transaction
    }

    async delete(id: string): Promise<null> {
        await prisma.transaction.delete({ where: { id } })

        return null
    }

    async getMonthTotalExpenses(id: string, month: number, year: number): Promise<number> {


        const total = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                user_id: id,
                date:{
                    gte: new Date(year, month, 1),
                    lte: new Date(year,month + 1, 0)
                }
            }
        })

        return total._sum.amount?.toNumber() ?? 0
    }

}