import { authenticateTestUser } from '@/utils/test/authenticateUser'
import { clearDataBase } from '@/utils/test/setupTestDatabase'
import request from 'superagent'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let app: any
let agent: ReturnType<typeof request.agent>

describe('Get Wallets E2E test', () => {
    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
    })

    afterAll(async () => {
        await clearDataBase()
    })

    it('should be able to gett all users wallets', async () => {
        const agent = await authenticateTestUser(app)

        await agent.post('/wallets/create').send({
            name: 'Minha carteira',
            total: 1000,
        })

        const res = await agent.get('/wallets/get-wallets')

        expect(res.body.wallets).toHaveLength(2)

    })
})