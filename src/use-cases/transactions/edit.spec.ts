import { TransactionsRepository } from "@/repositories/transactions-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { EditTransactionUseCase } from "./edit";
import {describe, it, expect, beforeEach} from 'vitest'
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { Decimal } from "@prisma/client/runtime/library";

let usersRepository: UsersRepository
let transactionsRepository: TransactionsRepository
let sut: EditTransactionUseCase

describe('Edit transaction Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        transactionsRepository = new InMemoryTransactionsRepository
        sut = new EditTransactionUseCase(transactionsRepository)
    })

    it('Should be able to edit a transaction', async () => {
        const transaction = await transactionsRepository.create({
            amount: new Decimal(100.53),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: 'Comida',
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        });

        const updatedTransaction = await sut.execute({
            request: {
                id: transaction.id,
                amount: new Decimal(200.75),
                description: 'Supermercado',
                location: 'Mercado Central',
                category: 'MECANICO',
                type: 'SAIDA'
            }
        });

        expect(updatedTransaction.transaction.amount.toNumber()).toBe(200.75);
        expect(updatedTransaction.transaction.description).toBe('Supermercado');
        expect(updatedTransaction.transaction.location).toBe('Mercado Central');
        expect(updatedTransaction.transaction.category).toBe('MECANICO');
        expect(updatedTransaction.transaction.type).toBe('SAIDA');
    });
})