import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';
import { app } from '../../../app';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { object } from 'zod';

describe('Create Expense Controller', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    server.close();
  });

  it('should be able to create a expense', async () => {
    const cookie = await createAndAuthenticateUser(server);

    const response = await request(server)
      .post('/expenses/create')
      .set('Cookie', cookie)
      .send({
        description: 'First Expense',
        location: "Nico's Bar",
        type: 'EXPENSE',
        amount: 100.0,
        date: new Date('2024-10-16'),
        method: 'CREDIT_CARD',
        category: 'Drinks',
        user_id: '1234-5678-9101',
      });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: expect.any(String),
      }),
    );
  });
});
