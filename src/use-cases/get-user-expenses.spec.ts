import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { GetUserExpensesUseCase } from './get-user-expenses';

let expensesRepository: InMemoryExpensesRepository;
let sut: GetUserExpensesUseCase;

describe('Get User Expenses Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetUserExpensesUseCase(expensesRepository);
  });

  it('should be able to get all user expenses', async () => {
    const user_id = 'user-1';

    await expensesRepository.create({
      category: 'Generic',
      description: 'Expense 1',
      location: 'Location 1',
      type: 'INCOME',
      amount: 100,
      date: new Date(),
      user_id,
      method: 'CREDIT_CARD',
    });

    await expensesRepository.create({
      category: 'Generic',
      description: 'Expense 2',
      location: 'Location 2',
      type: 'EXPENSE',
      amount: 200,
      date: new Date(),
      user_id,
      method: 'CREDIT_CARD',
    });

    const response = await sut.execute({ id: user_id, params: {} });

    expect(response.expenses).toHaveLength(2);
  });

  it('should be able to fetch user paginated expense history', async () => {
    const user_id = 'user-1';

    for (let i = 1; i <= 22; i++) {
      await expensesRepository.create({
        description: `Expense ${i}`,
        location: `Location ${i}`,
        type: 'EXPENSE',
        amount: Number(`${i}00`),
        date: new Date(),
        user_id,
        method: 'CREDIT_CARD',
        category: 'Generic',
      });
    }

    const { expenses } = await sut.execute({
      id: user_id,
      params: { page: 2 },
    });

    expect(expenses).toHaveLength(2);
    expect(expenses).toEqual([
      expect.objectContaining({ location: 'Location 21' }),
      expect.objectContaining({ location: 'Location 22' }),
    ]);
  });

  it('should be able to fetch user expenses by params', async () => {
    const user_id = 'user-1';

    await expensesRepository.create({
      description: 'Expense 1',
      location: 'Location 1',
      type: 'EXPENSE',
      amount: 100,
      date: new Date('2023-07-09'),
      user_id,
      method: 'CREDIT_CARD',
      category: 'Food',
    });

    await expensesRepository.create({
      description: 'Expense 2',
      location: 'Location 1',
      type: 'EXPENSE',
      amount: 100,
      date: new Date(),
      user_id,
      method: 'CREDIT_CARD',
      category: 'Pet',
    });

    const { expenses } = await sut.execute({
      id: user_id,
      params: { category: 'Food', query: 'Expense 1', year: 2023, month: 6 },
    });

    expect(expenses).toHaveLength(1);
  });
});
