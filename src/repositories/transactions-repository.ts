import {Prisma, Transaction} from '@prisma/client'

export interface TransactionsRepository {
    findById(id: string): Promise<Transaction | null>
    findByUserId(id: string): Promise<Transaction[]>
    create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
    edit(data: Prisma.TransactionUpdateInput): Promise<Transaction>
    delete(id: string): Promise<null>
}