import { ExpensesRepository } from '@/repositories/expenses-repository';

interface DeleteExpenseUseCaseRequest {
  id: string;
}

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({ id }: DeleteExpenseUseCaseRequest) {
    await this.expenseRepository.delete(id);

    return null;
  }
}
