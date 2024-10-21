import { app } from '../../../app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserExpenses } from '@/utils/test/create-user-expenses';

describe('Update Expenses Controller', () => {
  let server: Server;
  let cookie: string;

  beforeAll(async () => {
    server = app.listen(0);
    cookie = await createUserExpenses(server);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to update a user expense', async () => {
    const expenses = await request(server)
      .get('/expenses/')
      .set('Cookie', cookie);

    const response = await request(server)
      .patch(`/expenses/${expenses.body[0].id}`)
      .send({
        description: 'Updated description',
      })
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated description');
  });
});
