import { TransactionsRepository } from '@/repositories/transactions-repository'
import {describe,it,expect, beforeEach} from 'vitest'
import { CreateTransactionUseCase } from './create'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryWalletsRepository } from '@/repositories/in-memory/in-memory-wallets-repository'
import { WalletsRepository } from '@/repositories/wallets-repository'

let transactionsRepository: TransactionsRepository
let walletsRepository: WalletsRepository
let usersRepository: UsersRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        transactionsRepository = new InMemoryTransactionsRepository
        walletsRepository = new InMemoryWalletsRepository
        sut = new CreateTransactionUseCase(transactionsRepository, walletsRepository)
    })

    it('should be able to create a transaction', async() => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const {transaction} = await sut.execute({
            amount: 100.53,
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: 'Comida',
            location: 'Lattiera',
            method: 'CREDITO',
            type: 'SAIDA',
        })


        expect(transaction.amount).toEqual(100.53)
    })
})