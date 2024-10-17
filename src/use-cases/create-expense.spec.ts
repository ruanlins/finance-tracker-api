import { expect, describe, it, beforeEach } from 'vitest';
import { CreateExpenseUseCase } from './create-expense';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';

let expensesRepository: InMemoryExpensesRepository;
let sut: CreateExpenseUseCase;

describe('Create Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new CreateExpenseUseCase(expensesRepository);
  });

  it('should be able to create expense', async () => {
    const { expense } = await sut.execute({
      category: 'Generic',
      description: 'First expense created',
      location: 'Bar do Nico',
      amount: 127.5,
      date: new Date(),
      method: 'CREDIT_CARD',
      type: 'EXPENSE',
      user_id: 'user-1',
    });

    expect(expense.id).toEqual(expect.any(String));
  });
});
