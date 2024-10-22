import { Server } from 'http';
import { app } from '../../../app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserExpenses } from '@/utils/test/create-user-expenses';

describe('Get User Expenses Controller', () => {
  let server: Server;
  let cookie: string;

  beforeAll(async () => {
    server = app.listen(0);
    cookie = await createUserExpenses(server);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to get an expense by id', async () => {
    const getExpenseId = await request(server)
      .get('/expenses/')
      .set('Cookie', cookie);

    const response = await request(server)
      .get(`/expenses/${getExpenseId.body[0].id}`)
      .set('Cookie', cookie);

    console.log(response.body);

    expect(response.status).toEqual(200);
  });
});
