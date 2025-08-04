import { authenticateTestUser } from "@/utils/test/authenticateUser";
import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

let app: any
let agent: ReturnType<typeof request.agent>

describe('Get Month Transactions Value E2E',() => {
    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
        agent = await authenticateTestUser(app)

    })

    it('should be able to get the month transactions total', async() => {
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
            category: 'OUTROS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: resWallet.body.wallet.id
        })

        const res = await agent.get('/transactions/getmonthtransactions')


        expect(res.status).toEqual(200)
        expect(res.body.total).toEqual(200.73)
    })

    
})