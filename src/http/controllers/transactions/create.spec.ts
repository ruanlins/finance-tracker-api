import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { clearDataBase } from '@/utils/test/setupTestDatabase'
import { authenticateTestUser } from '@/utils/test/authenticateUser'
import request from 'supertest'

let app: any
let agent: ReturnType<typeof request.agent>

describe('Create Transactions E2E', () => {

    beforeAll(async () => {

        const server = await import('@/app');
        app = server.app;

        agent = request.agent(app);
    })

    afterAll(async () => {
        await clearDataBase()
    })

    it('should be able to register a transaction', async () => {
        const agent = await authenticateTestUser(app)

        const resWallet = await agent.post('/wallets/create').send({
            name: 'Carteira Nova',
            total: 500
        })

        const res = await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Mensalidade Faculdade',
            category: 'OUTROS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: resWallet.body.wallet.id
        })
        
        expect(res.status).toBe(201)
    })

})