import { beforeEach, describe, expect, it } from "vitest";
import { GetMonthCategoriesTransactionsUseCase } from "./get-month-categories-transactions";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-repository";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { Decimal } from "@prisma/client/runtime/library";

let transactionsRepository: TransactionsRepository
let sut: GetMonthCategoriesTransactionsUseCase

describe('Get Month Categories transactions', () => {
    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository()
        sut = new GetMonthCategoriesTransactionsUseCase(transactionsRepository)
    })

    it('should return the month transactions by categories', async () => {
        await transactionsRepository.create({
            amount: new Decimal(200.00),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMIDA',
            description: 'Comida',
            location: 'Lattiera',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        await transactionsRepository.create({
            amount: new Decimal(300.50),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'JOGOS',
            description: 'BF6',
            location: 'Steam',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        await transactionsRepository.create({
            amount: new Decimal(300.50),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'JOGOS',
            description: 'BF6',
            location: 'Steam',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        await transactionsRepository.create({
            amount: new Decimal(220.46),
            date: new Date(),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMBUSTIVEL',
            description: 'Gasolina',
            location: 'Riviera',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        const { categories } = await sut.execute({ user_id: 'user1' })
        expect(categories).toBeInstanceOf(Object)
    })

    it('should return 0 if there are no transactions in the current month', async () => {

        const { categories } = await sut.execute({ user_id: 'user1' })
        expect(categories).toEqual(0)
    })

    it('should be able to search prior months', async () => {
        await transactionsRepository.create({
            amount: new Decimal(220.46),
            date: new Date('2025-05-15'),
            user_id: 'user1',
            wallet_id: 'wallet1',
            category: 'COMBUSTIVEL',
            description: 'Gasolina',
            location: 'Riviera',
            type: 'SAIDA',
            method: 'CREDITO',
        })

        const {categories} = await sut.execute({user_id: 'user1', month:4})

        expect(categories).toBeInstanceOf(Object)
    })

})