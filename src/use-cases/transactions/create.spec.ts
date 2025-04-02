import { TransactionsRepository } from '@/repositories/transactions-repository'
import {describe,it,expect, beforeEach} from 'vitest'
import { CreateTransactionUseCase } from './create'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Decimal } from '@prisma/client/runtime/library'

let transactionsRepository: TransactionsRepository
let usersRepository: UsersRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        transactionsRepository = new InMemoryTransactionsRepository
        sut = new CreateTransactionUseCase(transactionsRepository)
    })

    it('should be able to create a transaction', async() => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const {transaction} = await sut.execute({
            amount: new Decimal(100.53),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'Teste Cat',
            description: 'Comida',
            location: 'Lattiera',
            type: 'Comida',
        })

        console.log(transaction)


        expect(transaction.amount.toNumber()).toEqual(100.53)
    })
})