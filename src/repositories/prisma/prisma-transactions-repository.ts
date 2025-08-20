import { Transaction, Prisma } from "@prisma/client";
import { FindByUserIdParams, TransactionsRepository } from "../transactions-repository";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaTransactionsRepository implements TransactionsRepository {
    async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transaction.findUnique({ where: { id } })

        return transaction
    }

    async findByUserId(id: string, params:FindByUserIdParams): Promise<Transaction[]> {
        const {month, year,query, offset,category,page} = params

        let dateFilter: {gte: Date; lte:Date} | undefined

        if(month != null && year != null) {
            const startDate = new Date(year,month-1, 1)
            const endDate = new Date(year, month, 0)
            dateFilter = { gte: startDate, lte: endDate }
        }

        const transactions = prisma.transaction.findMany(
            { where: 
                { user_id: id,
                  date: dateFilter,
                  description: query ? { contains: query, mode: 'insensitive' } : undefined,
                  category: category ? { equals: category } : undefined
                },
              take: offset ? offset : 20,
              skip: page ? (page - 1) * (offset || 20) : 0,   
            },
        )    

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

    async getMonthCategoriesTransactions(user_id: string, month: number, year: number): Promise<{ [key: string]: number; } | 0> {

        const transactions = await prisma.transaction.groupBy({
            by: ['category'],
            where: {
                user_id,
                date:{
                    gte: new Date(year,month,1),
                    lte: new Date(year,month + 1, 0)
                }
            },
            _sum: {
                amount: true
            }
        })

        if (transactions.length === 0) return 0

        return Object.fromEntries(
            transactions.map(transaction => [
                transaction.category,
                new Decimal(transaction._sum.amount || 0).toDecimalPlaces(2).toNumber()
            ])
        )
    }
}