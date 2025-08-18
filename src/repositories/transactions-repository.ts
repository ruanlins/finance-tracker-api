import {Prisma, Transaction} from '@prisma/client'

export interface FindByUserIdParams {
    page?: number,
    query?: string,
    category?: string,
    year?: number,
    month?: number,
}

export interface TransactionsRepository {
    findById(id: string): Promise<Transaction | null>
    findByUserId(id: string, params?: FindByUserIdParams): Promise<Transaction[]>
    getMonthTotalExpenses(id: string, month:number, year:number): Promise<number>
    create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
    edit(id: string,data: Prisma.TransactionUpdateInput): Promise<Transaction>
    delete(id: string): Promise<null>
    getMonthCategoriesTransactions(user_id: string, month: number, year: number): Promise<{ [key: string]: number }|0>
}