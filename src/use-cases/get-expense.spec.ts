import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { GetExpenseUseCase } from './get-expense';
import exp from 'constants';

let expensesRepository: InMemoryExpensesRepository;
let sut: GetExpenseUseCase;

describe('Get Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetExpenseUseCase(expensesRepository);
  });

  it('should be able to get a expense by id', async () => {
    const createdExpense = await expensesRepository.create({
      description: 'Expense 1',
      location: 'Location 1',
      type: 'INCOME',
      amount: 100,
      date: new Date(),
      user_id: 'user-1',
      method: 'CREDIT_CARD',
      category: 'Generic',
    });

    const { expense } = await sut.execute({
      id: createdExpense.id,
    });

    expect(expense?.id).toEqual(expect.any(String));
  });
});