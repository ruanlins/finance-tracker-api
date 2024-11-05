import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { GetMonthExpenseByIdUseCase } from './get-month-expense';

let expensesRepository: InMemoryExpensesRepository;
let sut: GetMonthExpenseByIdUseCase;

describe('Get Month Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetMonthExpenseByIdUseCase(expensesRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to get the last 30 days expenses from the user', async () => {
    for (let i = 0; i < 3; i++) {
      await expensesRepository.create({
        description: 'Expense 1',
        location: 'Location 1',
        type: 'INCOME',
        amount: 200,
        date: new Date(),
        user_id: 'user-1',
        method: 'CREDIT_CARD',
        category: 'Generic',
      });
    }
    await expensesRepository.create({
      description: 'Expense 1',
      location: 'Location 1',
      type: 'INCOME',
      amount: 200,
      date: new Date(2024, 5, 15),
      user_id: 'user-1',
      method: 'CREDIT_CARD',
      category: 'Generic',
    });

    const { value } = await sut.execute({
      id: 'user-1',
    });

    expect(value).toEqual(600);
  });

  it('should be able to get the last 30 days expenses from the user even if the month is january', async () => {
    vi.setSystemTime(new Date(2024, 0, 15));

    await expensesRepository.create({
      description: 'Expense 1',
      location: 'Location 1',
      type: 'INCOME',
      amount: 200,
      date: new Date(2023, 11, 25),
      user_id: 'user-1',
      method: 'CREDIT_CARD',
      category: 'Generic',
    });

    await expensesRepository.create({
      description: 'Expense 1',
      location: 'Location 1',
      type: 'INCOME',
      amount: 200,
      date: new Date(2024, 0, 5),
      user_id: 'user-1',
      method: 'CREDIT_CARD',
      category: 'Generic',
    });

    const { value } = await sut.execute({
      id: 'user-1',
    });

    expect(value).toEqual(400);
  });
});
