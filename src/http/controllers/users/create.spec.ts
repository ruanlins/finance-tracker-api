import { app } from '@/app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create User Controller', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to register', async () => {
    const response = await request(server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toEqual(201);
  });
});
