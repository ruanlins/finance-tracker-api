import { TransactionsRepository } from "@/repositories/transactions-repository";
import { GetMonthTransactionsUseCase } from "./get-month-transactions";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { Decimal } from "@prisma/client/runtime/library";

let transactionsRepository: TransactionsRepository
let sut: GetMonthTransactionsUseCase

describe('Get Month Transactions Use Case', () => {
    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository
        sut = new GetMonthTransactionsUseCase(transactionsRepository)
    })

    it('should return the correct value of transactions in the current month', async () => {
        let transaction
        for (let i = 1; i < 5; i++) {
            transaction = await transactionsRepository.create({
                amount: new Decimal(`${100 * i}.39`),
                date: new Date(),
                user_id: 'user1',
                wallet_id: 'wallet1',
                category: 'COMIDA',
                description: 'Comida',
                location: 'Lattiera',
                type: 'SAIDA',
                method: 'CREDITO',
            });
        }

        const { total } = await sut.execute({ user_id: 'user1' })

        expect(total).toEqual(1001.56)
    })

    it('should not count transactions made in another month', async () => {
        let transaction
        for (let i = 1; i < 5; i++) {
            transaction = await transactionsRepository.create({
                amount: new Decimal(`${100 * i}.39`),
                date: new Date(),
                user_id: 'user1',
                wallet_id: 'wallet1',
                category: 'COMIDA',
                description: 'Comida',
                location: 'Lattiera',
                type: 'SAIDA',
                method: 'CREDITO',
            });
        }

        await transactionsRepository.create({
            amount: new Decimal(250.00),
            date: new Date('2025-04-21'),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: 'Comida',
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        const { total } = await sut.execute({ user_id: 'user1' })

        expect(total).toEqual(1001.56)
    })

    it('should not consider transactions from another user', async () => {
        let transaction
        for (let i = 1; i < 5; i++) {
            transaction = await transactionsRepository.create({
                amount: new Decimal(`${100 * i}.39`),
                date: new Date(),
                user_id: 'user1',
                wallet_id: 'wallet1',
                category: 'COMIDA',
                description: 'Comida',
                location: 'Lattiera',
                type: 'SAIDA',
                method: 'CREDITO',
            });
        }

        await transactionsRepository.create({
            amount: new Decimal(250.00),
            date: new Date(),
            user_id: 'user2',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: 'Comida',
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        const {total} = await sut.execute({user_id: 'user1'})

        expect(total).toEqual(1001.56)
    })

    it('should return 0 if there is no transactions in the current month', async () => {
        const {total} = await sut.execute({user_id: 'user1'})

        expect(total).toEqual(0)
    })
})