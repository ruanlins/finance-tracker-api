import { describe, it, afterAll, beforeAll, expect } from 'vitest';
import request from 'supertest';
import {
  startTestDatabase,
  stopTestDatabase,
} from '@/utils/test/setupTestDatabase';

let app: any;

describe('Register User e2e test', () => {
  beforeAll(async () => {
    await startTestDatabase();

    const server = await import('@/app');
    app = server.app;
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  it('should be able to register', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'test@123',
    });

    expect(res.status).toBe(201);
    expect(res.body.usuario.nome).toBe('John Doe');
  });

  it('should not create another user with the same email', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'test@123',
    });

    expect(res.status).toBe(409);
  });
});
