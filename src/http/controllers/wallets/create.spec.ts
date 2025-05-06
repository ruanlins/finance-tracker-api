import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { startTestDatabase, stopTestDatabase } from '@/utils/test/setupTestDatabase';

let app: any;
let agent: ReturnType<typeof request.agent>

describe('Create Wallet e2e test', () => {
  beforeAll(async () => {
    await startTestDatabase();
    const server = await import('@/app');
    app = server.app;

    agent = request.agent(app);
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  it('should be able to create a wallet', async () => {
    await agent.post('/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const res = await agent.post('/wallets/create').send({
      name: 'Minha carteira',
      total: 1000,
    });

    expect(res.status).toBe(201);
  });
});