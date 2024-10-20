import { app } from '../../../app';
import { Server } from 'http';
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

  it('should be able to get all user expenses', async () => {
    const response = await request(server)
      .get('/expenses/')
      .set('Cookie', cookie);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(2);
  });

  it('should be able to filter expenses using search params', async () => {
    const response = await request(server)
      .get('/expenses?category=Food')
      .set('Cookie', cookie);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to filter expenses using all search params', async () => {
    const response = await request(server)
      .get('/expenses?category=Food&query=Second%20Expense&year=2024&month=10')
      .set('Cookie', cookie);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });
});
