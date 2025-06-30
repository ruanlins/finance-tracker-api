import {describe, it , beforeAll, afterAll, expect} from 'vitest'
import request from 'supertest'
import { authenticateTestUser } from '@/utils/test/authenticateUser'

let app: any
let agent: ReturnType<typeof request.agent>

describe('Delete Transaction E2E test', () => {

    beforeAll(async() => {
        const server = await import('@/app')
        app = server.app

        agent = request.agent(app)
        agent = await authenticateTestUser(app)
    })

    it('should be able to delete a transaction', async() => {

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

        const res = await agent.delete(`/transactions/delete/${resTransaction.body.transaction.id}`)

        console.log(resTransaction.body.transaction.id)

        expect(res.body).toBe('Transação apagada com sucesso.')
        expect(res.status).toBe(200)

    })

    it('should not be able to delete a transaction that doesnt exists', async() => {

        const res = await agent.delete(`/transactions/delete/asdk1234a,234123}`)

        expect(res.status).toBe(404)

    })
})