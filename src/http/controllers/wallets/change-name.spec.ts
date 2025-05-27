import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { clearDataBase } from '@/utils/test/setupTestDatabase';
import { authenticateTestUser } from '@/utils/test/authenticateUser';

let app: any;
let agent: ReturnType<typeof request.agent>

describe('Edit Wallet e2e test', () => {
  beforeAll(async () => {
    const server = await import('@/app');
    app = server.app;

    agent = request.agent(app);
  });

  afterAll(async () => {
    await clearDataBase();
  });

  it('should be able to edit a wallet', async () => {
    const agent = await authenticateTestUser(app)
    const resCreate = await agent.post('/wallets/create').send({
      name: 'Minha carteira',
      total: 1000,
    });

    const res = await agent.patch(`/wallets/edit/${resCreate.body.wallet.id}`).send({ name: 'Novo nome de carteira' })

    expect(res.status).toBe(200);
  });

  it('should not be able to edit a wallet with the same name', async () => {
    await agent.post('/users/authenticate').send({
      email: 'testuser@example.com',
      password: 'password123',
    })

    const resCreate = await agent.post('/wallets/create').send({
      name: 'Minha carteira teste',
      total: 1000,
    });

    const res = await agent.patch(`/wallets/edit/${resCreate.body.wallet.id}`).send({ name: 'Minha Carteira' })

    expect(res.status).toBe(409)
  })

});