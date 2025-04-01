import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepository } from "../transactions-repository";

export class InMemoryTransactionsRepository implements TransactionsRepository{
public items: Transaction[] = []

     async create(data: Prisma.TransactionUncheckedCreateInput) {
         const transaction = {
              ...data as Transaction,
              id: 'transaction1'
         } as Transaction

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

     async findByUserId(id: string) {
          const transactions = this.items.filter(transaction => transaction.id === id) as Transaction[]

          return transactions
         
     }
}