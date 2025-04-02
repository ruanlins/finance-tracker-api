import { TransactionsRepository } from '@/repositories/transactions-repository'
import {describe, it, beforeEach, expect} from 'vitest'
import { DeleteTransactionUseCase } from './delete'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Decimal } from '@prisma/client/runtime/library'

let usersRepository: UsersRepository
let transactionsRepository: TransactionsRepository
let sut: DeleteTransactionUseCase

describe('Delete transaction use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        transactionsRepository = new InMemoryTransactionsRepository
        sut = new DeleteTransactionUseCase(transactionsRepository)
    })

    it('should be able delete a transaction', async() => {
        await usersRepository.create({
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    password: '123456',
                })
        
        const transaction = await transactionsRepository.create({
            amount: new Decimal(100.53),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'Teste Cat',
            description: 'Comida',
            location: 'Lattiera',
            type: 'Comida',
        })

        await sut.execute({id: transaction.id})

        const transactions = await transactionsRepository.findByUserId('user1')

        expect(transactions).toHaveLength(0)

    })


})