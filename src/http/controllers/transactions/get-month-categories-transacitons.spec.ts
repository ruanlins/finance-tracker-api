import { beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { authenticateTestUser } from "@/utils/test/authenticateUser";

let app: any
let agent: ReturnType<typeof request.agent>

describe('Get month categories Transactions E2E', () => {
    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
        agent = await authenticateTestUser(app)
    })

    it('should return the month transactions by categories', async () => {
        const resWallet = await agent.post('/wallets/create').send({
            name: 'Carteira Nova',
            total: 500
        })

        await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Mensalidade Faculdade',
            category: 'OUTROS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: resWallet.body.wallet.id
        })

        await agent.post('/transactions/create').send({
            amount: 75.00,
            description: 'Mensalidade Faculdade',
            category: 'PET',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: resWallet.body.wallet.id
        })

        const res = await agent.get('/transactions/getmonthcategoriestransactions')

        expect(res.body).toBeInstanceOf(Object)
    })

    it('should return 0 if there is no transaction in the month', async () => {
        const res = await agent.get('/transactions/getmonthcategoriestransactions?month=2')

        expect(res.body).toEqual({Gastos: 0})
    })
})