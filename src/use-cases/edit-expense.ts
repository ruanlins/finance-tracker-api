import { $Enums, Expense } from '@prisma/client';
import { ExpensesRepository } from '@/repositories/expenses-repository';

interface EditExpenseUseCaseRequest {
  id?: string;
  description?: string;
  location?: string;
  type?: $Enums.Type;
  amount?: number;
  date?: Date | string;
  user_id?: string;
  method?: $Enums.Method;
}

interface EditExpenseUseCaseResponse {
  expense: Expense;
}

export class EditExpenseUseCase {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute(
    data: EditExpenseUseCaseRequest,
  ): Promise<EditExpenseUseCaseResponse> {
    const expense = await this.expenseRepository.update(data);

    return { expense };
  }
}
