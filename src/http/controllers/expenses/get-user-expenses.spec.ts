import { app } from '../../../app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserExpenses } from '@/utils/test/create-user-expenses';

describe('Get User Expenses Controller', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to get all user expenses', async () => {
    const cookie = await createUserExpenses(server);

    const response = await request(server)
      .get('/expenses/')
      .set('Cookie', cookie);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(2);
  });

  // it('should be able to get user expenses by params', async () => {
  //   const cookie = await createAndAuthenticateUser(server);

  //   const response = await request(server)
  //     .post('/expenses/create')
  //     .set('Cookie', cookie);

  //   expect(response.status).toEqual(201);
  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       id: expect.any(String),
  //       user_id: expect.any(String),
  //     }),
  //   );
  // });
});
