import { authenticateTestUser } from "@/utils/test/authenticateUser";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { date } from "zod";

let app: any
let agent: ReturnType<typeof request.agent>
let walletId: string

describe('Get Transactions E2E', () => {
    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = await authenticateTestUser(app)
    })

    it('should get the user last 20 transactions', async () => {
        const resWallet = await agent.post('/wallets/create').send({
            name: 'Carteira Nova',
            total: 500
        })

        walletId = resWallet.body.wallet.id

        for (let i = 0; i < 25; i++) {
            await agent.post('/transactions/create').send({
                amount: 125.73,
                description: 'Mensalidade Faculdade',
                category: 'OUTROS',
                method: 'PIX',
                type: 'SAIDA',
                wallet_id: resWallet.body.wallet.id
            })
        }

        const res = await agent.get('/transactions/gettransactions')

        expect(res.body.transactions.length).toEqual(20)
    })

    it('should be able to get transactions using filter', async () => {

        await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Echop',
            category: 'BEBIDAS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: walletId
        })

        await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'peak',
            category: 'JOGOS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: walletId
        })

        await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Celular',
            category: 'ELETRONICO',
            method: 'PIX',
            type: 'SAIDA',
            date: new Date(2023, 10, 20),
            wallet_id: walletId
        })


        const resCategory = await agent.get('/transactions/gettransactions?category=JOGOS')
        const resYear = await agent.get('/transactions/gettransactions?year=2023&month=11')
        const resDesc = await agent.get('/transactions/gettransactions?query=peak')

        expect(resCategory.body.transactions.length).toEqual(1)
        expect(resYear.body.transactions.length).toEqual(1)
        expect(resDesc.body.transactions.length).toEqual(1)
    })

    it('should be able to paginate through the transactions', async () => {

        const res = await agent.get('/transactions/gettransactions?page=2')

        expect(res.body.transactions.length).toBe(7)

    })
})