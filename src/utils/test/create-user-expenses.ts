import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Server } from 'http';
import request from 'supertest';

export async function createUserExpenses(app: Server) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: await hash('123456', 6),
    },
  });

  const response = await request(app).post('/users/session').send({
    email: 'johndoe@test.com',
    password: '123456',
  });

  const cookie = response.header['set-cookie'];
  const user_id = response.body.id;

  await request(app)
    .post('/expenses/create')
    .send({
      description: 'First Expense',
      location: 'Nico Bar',
      type: 'EXPENSE',
      amount: 100,
      date: '2024-10-16T00:00:00.000Z',
      method: 'CREDIT_CARD',
      category: 'Drinks',
      user_id,
    })
    .set('Cookie', cookie);

  await request(app)
    .post('/expenses/create')
    .send({
      description: 'Second Expense',
      location: 'Work',
      type: 'INCOME',
      amount: 125,
      date: '2024-10-17T00:00:00.000Z',
      method: 'PIX',
      category: 'Food',
      user_id,
    })
    .set('Cookie', cookie);

  return cookie;
}
