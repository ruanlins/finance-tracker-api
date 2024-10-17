import { app } from '../../../app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Logout User Controller', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to logout', async () => {
    const loginResponse = await request(server).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await request(server)
      .post('/users/logout')
      .set('Cookie', loginResponse.headers['set-cookie']);

    expect(response.status).toEqual(200);
  });
});
