import { TransactionsRepository } from "@/repositories/transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { GetTransactionsUseCase } from "./get-transactions";
import { Decimal } from "@prisma/client/runtime/library";

let transactionsRepository: TransactionsRepository
let sut: GetTransactionsUseCase

describe('Get transactions unit tests', () => {
    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository()
        sut = new GetTransactionsUseCase(transactionsRepository)
    })

    it('should return the last 20 transctions from the user', async () => {
        for (let i = 0; i < 30; i++) {
            await transactionsRepository.create({
                amount: new Decimal(100.50),
                date: new Date(),
                user_id: 'user1',
                wallet_id: 'wallet1',
                category: 'COMIDA',
                description: `Comida ${i}`,
                location: 'Lattiera',
                type: 'SAIDA',
                method: 'CREDITO',
            });
        }

        const { transactions } = await sut.execute({ user_id: 'user1' })

        expect(transactions.length).toEqual(20)
    })

    it('should be able to paginate the transactions', async () => {
        for (let i = 0; i < 30; i++) {
            await transactionsRepository.create({
                amount: new Decimal(100.50),
                date: new Date(),
                user_id: 'user1',
                wallet_id: 'wallet1',
                category: 'COMIDA',
                description: `Comida ${i}`,
                location: 'Lattiera',
                type: 'SAIDA',
                method: 'CREDITO',
            });
        }

        const { transactions } = await sut.execute({ user_id: 'user1', params: { page: 2 } })

        expect(transactions.length).toEqual(10)
    })

    it('should return and empty array if there is no transaction', async () => {


        const { transactions } = await sut.execute({ user_id: 'user1' })

        expect(transactions).toEqual([])
    })

    it('should be able to filter using params', async () => {

        await transactionsRepository.create({
            amount: new Decimal(100.50),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: `Comida`,
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        });

        await transactionsRepository.create({
            amount: new Decimal(100.50),
            date: new Date(2023,11,20),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: `Comida`,
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        });


        const { transactions } = await sut.execute({
            user_id: 'user1', params: {
                year: 2023,
                month: 11,
            }
        })

        expect(transactions.length).toEqual(1)
    })
})