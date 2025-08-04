import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepository } from "../transactions-repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryTransactionsRepository implements TransactionsRepository {
     public items: Transaction[] = []

     async create(data: Prisma.TransactionUncheckedCreateInput) {
          const transaction = {
               ...data as Transaction,
          }

          this.items.push(transaction)

          return transaction


     }

     async delete(id: string) {
          this.items = this.items.filter((transaction) => transaction.id !== id)

          return null
     }

     async edit(id: string, data: Prisma.TransactionUpdateInput) {
          const index = this.items.findIndex(item => item.id === id);


          this.items[index] = { ...this.items[index], ...data as Transaction };

          return this.items[index]
     }

     async findById(id: string) {

          const transaction = this.items.find(transaction => transaction.id === id) as Transaction

          return transaction

     }

     async findByUserId(user_id: string) {
          const transactions = this.items.filter(transaction => transaction.user_id === user_id) as Transaction[]
          return transactions
     }

     async getMonthTotalExpenses(id: string, month: number, year: number) {
          const transactions = this.items.filter(transaction =>
               transaction.user_id === id &&
               transaction.date?.getMonth() === month - 1 &&
               transaction.date?.getFullYear() === year
          )

          let total = new Decimal(0)
          for (const t of transactions) {
               total = total.plus(t.amount)
          }

          return total.toDecimalPlaces(2).toNumber()
     }
}