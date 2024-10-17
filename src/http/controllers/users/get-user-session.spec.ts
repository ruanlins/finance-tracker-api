import { app } from '@/app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get Session User Controller', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to get user information', async () => {
    const createResponse = await request(server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(server)
      .get('/users/')
      .set('Cookie', createResponse.headers['set-cookie']);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      user: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      },
    });
  });
});
