import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest';
import { clearDataBase } from '@/utils/test/setupTestDatabase';
import { authenticateTestUser } from '@/utils/test/authenticateUser';

let app: any
let agent: ReturnType<typeof request.agent>

describe('Get Wallet E2E test', () => {

    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
    })

    afterAll(async () => {
        await clearDataBase()
    })

    it('should be able do get a user wallet E2E', async () => {
        const agent = await authenticateTestUser(app)

        const createWalletRes = await agent.post('/wallets/create').send({
            name: 'Minha carteira',
            total: 1000,
        })

        const res = await agent.get(`/wallets/get-wallet/${createWalletRes.body.wallet.id}`)

        expect(res.body).toMatchObject({
            wallet: {
                name: "Minha carteira",
                total: "1000",
            },
        })
    })

})