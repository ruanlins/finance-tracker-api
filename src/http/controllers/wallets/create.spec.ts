import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';

import { clearDataBase} from '@/utils/test/setupTestDatabase';
import { authenticateTestUser } from '@/utils/test/authenticateUser';


let app: any;
let agent: ReturnType<typeof request.agent>

describe('Create Wallet e2e test', () => {
  beforeAll(async () => {
    const server = await import('@/app');
    app = server.app;

    agent = request.agent(app);
  });

  afterAll(async () => {

    clearDataBase();
  });

  it('should be able to create a wallet', async () => {
    const agent = await authenticateTestUser(app)

    const res = await agent.post('/wallets/create').send({
      name: 'Minha carteira',
      total: 1000,
    });

    expect(res.status).toBe(201);
  });


  it('should not be able to create a wallet with the same name', async () => {
   await agent.post('/users/authenticate').send({
    email: 'testuser@example.com',
    password: 'password123',
   }) 

  const res = await agent.post('/wallets/create').send({
      name: 'Minha carteira',
      total: 1000,
    });

    expect(res.status).toBe(409)
  })
  });