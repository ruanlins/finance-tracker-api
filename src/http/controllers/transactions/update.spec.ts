import { authenticateTestUser } from '@/utils/test/authenticateUser'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

let app: any
let agent: ReturnType<typeof request.agent>

describe('Update Transaction E2E', () => {
    beforeAll(async () => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
        agent = await authenticateTestUser(app)
    })

    it('should be able to update a transaction', async () => {

        const resWallet = await agent.post('/wallets/create').send({
            name: 'Carteira Nova',
            total: 500
        })

        const resTransaction = await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Mensalidade Faculdade',
            category: 'OUTROS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: resWallet.body.wallet.id
        })

        const res = await agent.patch(`/transactions/update/${resTransaction.body.transaction.id}`).send({
            description: "Updated description",
            id: resTransaction.body.transaction.id,
            user_id: resTransaction.body.transaction.user_id

        })

        expect(res.status).toBe(200)
    })

    it('should not be able to edit a transaction that doens"t exists', async () => {

        const res = await agent.patch('/transactions/update/testparam').send({
            description: "Updated description",
            id: 'test id',
            user_id: 'teste user id'

        })

        expect(res.status).toBe(404)

    })

})