import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';
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
    const cookie = await createAndAuthenticateUser(server);

    const response = await request(server)
      .post('/users/logout')
      .set('Cookie', cookie);

    expect(response.status).toEqual(200);
  });
});
