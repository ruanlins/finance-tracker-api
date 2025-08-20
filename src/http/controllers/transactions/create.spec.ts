import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { authenticateTestUser } from '@/utils/test/authenticateUser'
import request from 'supertest'

let app: any
let agent: ReturnType<typeof request.agent>
let walletId: string

describe('Create Transactions E2E', () => {

    beforeAll(async () => {

        const server = await import('@/app');
        app = server.app;

        agent = await authenticateTestUser(app)
    })

    it('should be able to register a transaction', async () => {

        const resWallet = await agent.post('/wallets/create').send({
            name: 'Carteira Nova',
            total: 500
        })

        walletId = resWallet.body.wallet.id

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

    it('should be able to create a transaction with a random date', async() => {

        const res = await agent.post('/transactions/create').send({
            amount: 125.73,
            description: 'Mensalidade Faculdade',
            category: 'OUTROS',
            method: 'PIX',
            type: 'SAIDA',
            wallet_id: walletId,
            date:new Date(2023,10,20)
        })

        expect(res.body.transaction.date.split('T')[0]).toEqual('2023-11-20')
    })

})