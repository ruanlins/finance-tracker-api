import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { EditExpenseUseCase } from './edit-expense';

let expensesRepository: InMemoryExpensesRepository;
let sut: EditExpenseUseCase;

describe('Edit Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new EditExpenseUseCase(expensesRepository);
  });

  it('should be able to edit expense', async () => {
    await expensesRepository.create({
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
      id: 'Expense-1',
      description: 'Edited Expense 1',
      location: 'Location 2',
    });

    expect(expense.description).toEqual('Edited Expense 1');
  });
});
