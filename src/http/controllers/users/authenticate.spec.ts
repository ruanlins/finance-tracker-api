import { describe, it, afterAll, beforeAll, expect } from 'vitest';
import {
  clearDataBase
} from '@/utils/test/setupTestDatabase';
import { authenticateTestUser } from '@/utils/test/authenticateUser';

let app: any;

describe('Authenticate User e2e test', () => {
  beforeAll(async () => {
    const server = await import('@/app');
    app = server.app;
  });

  afterAll(async () => {
    await clearDataBase()
  });

  it('should be able to authenticate', async () => {
    const agent = await authenticateTestUser(app);
    const res = await agent.post('/users/authenticate').send({
      email: 'testuser@example.com',
      password: 'password123',
    });


    expect(res.status).toBe(200);
  });
});
