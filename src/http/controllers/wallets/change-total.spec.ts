import { describe, it, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest';
import { clearDataBase } from '@/utils/test/setupTestDatabase';
import { authenticateTestUser } from '@/utils/test/authenticateUser';

let app: any;
let agent: ReturnType<typeof request.agent>

describe('Change Wallet Total E2E Test', () => {

    beforeAll(async () => {
        const server = await import('@/app');
        app = server.app;

        agent = request.agent(app);
    });

    afterAll(async () => {
        await clearDataBase();
    });

    it('should be able do change the wallet total', async () => {
        const agent = await authenticateTestUser(app)

        const resCreate = await agent.post('/wallets/create').send({
            name: 'Minha carteira teste',
            total: 1000,
        });

        const res = await agent.patch(`/wallets/edit-total/${resCreate.body.wallet.id}`).send({ total: 800 })

        expect(res.status).toBe(200)
    })


})