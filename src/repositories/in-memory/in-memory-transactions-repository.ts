import { Prisma, Transaction } from "@prisma/client";
import { FindByUserIdParams, TransactionsRepository } from "../transactions-repository";
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

     async findByUserId(user_id: string, params: FindByUserIdParams = {}) {
          const allTransactions = this.items.filter(transaction => {
               if (transaction.user_id !== user_id) return false;
               if (params.month != null && transaction.date.getMonth() !== params.month) return false;
               if (params.year != null && transaction.date.getFullYear() !== params.year) return false;
               if (params.category != null && transaction.category !== params.category) return false;
               return true;
          }
          ) as Transaction[]

          const offset = params.offset || 20
          const page = params.page || 1

          const transactions = allTransactions.slice(offset * (page - 1), offset * page)

          return transactions
     }

     async getMonthTotalExpenses(id: string, month: number, year: number) {
          const transactions = this.items.filter(transaction =>
               transaction.user_id === id &&
               transaction.date?.getMonth() === month &&
               transaction.date?.getFullYear() === year
          )

          let total = new Decimal(0)
          for (const t of transactions) {
               total = total.plus(t.amount)
          }

          return total.toDecimalPlaces(2).toNumber()
     }

     async getMonthCategoriesTransactions(user_id: string, month: number, year: number) {
          const transactions = this.items.filter(transaction =>
               transaction.user_id === user_id &&
               transaction.date?.getMonth() === month &&
               transaction.date?.getFullYear() === year
          )

          if (transactions.length === 0) return 0

          const categoriesRecord: Record<string, Decimal> = {}

          for (const transaction of transactions) {
               if (!categoriesRecord[transaction.category]) {
                    categoriesRecord[transaction.category] = new Decimal(0)
               }

               categoriesRecord[transaction.category] = categoriesRecord[transaction.category].plus(transaction.amount)
          }

          const categories = Object.fromEntries(
               Object.entries(categoriesRecord).map(([key, value]) =>
                    [key,
                         value.toDecimalPlaces(2).toNumber()
                    ]
               )
          )

          return categories

     }
}