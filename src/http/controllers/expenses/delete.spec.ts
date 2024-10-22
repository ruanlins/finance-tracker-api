import { app } from '../../../app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserExpenses } from '@/utils/test/create-user-expenses';

describe('Delete Expenses Controller', () => {
  let server: Server;
  let cookie: string;

  beforeAll(async () => {
    server = app.listen(0);
    cookie = await createUserExpenses(server);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to delete an expense', async () => {
    const expenses = await request(server)
      .get('/expenses/')
      .set('Cookie', cookie);

    const response = await request(server)
      .post(`/expenses/delete/${expenses.body[0].id}`)
      .set('Cookie', cookie);

    expect(response.status).toBe(204);
  });
});
