import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { GetMonthQuantityUseCase } from './get-month-expenses-quantity';

let expensesRepository: InMemoryExpensesRepository;
let sut: GetMonthQuantityUseCase;

describe('Get Month Value Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetMonthQuantityUseCase(expensesRepository);
  });

  it('should be able to get the last 30 days number of expenses from the user', async () => {
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

    const { quantity } = await sut.execute({
      id: 'user-1',
    });

    expect(quantity).toEqual(3);
  });
});
