import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { DeleteExpenseUseCase } from './delete-expense';

let expensesRepository: InMemoryExpensesRepository;
let sut: DeleteExpenseUseCase;

describe('Delete Expense Use Case', () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    sut = new DeleteExpenseUseCase(expensesRepository);
  });

  it('should be able to delete expense', async () => {
    await expensesRepository.create({
      id: 'expense-1',
      description: 'First expense created',
      location: 'Bar do Nico',
      amount: 127.5,
      date: new Date(),
      method: 'CREDIT_CARD',
      type: 'EXPENSE',
      user_id: 'user-1',
      category: 'Generic',
    });

    await sut.execute({ id: 'expense-1' });

    const expenses = await expensesRepository.findByUserId('user-1', {});

    expect(expenses).toHaveLength(0);
  });
});
