import { $Enums, Expense } from '@prisma/client';
import { ExpensesRepository } from '@/repositories/expenses-repository';

interface CreateExpenseUseCaseRequest {
  description: string;
  location: string;
  type: $Enums.Type;
  amount: number;
  date: Date;
  user_id: string;
  method: $Enums.Method;
  category: string;
}

interface CreateExpenseUseCaseResponse {
  expense: Expense;
}

export class CreateExpenseUseCase {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({
    description,
    location,
    type,
    amount,
    date,
    user_id,
    method,
    category,
  }: CreateExpenseUseCaseRequest): Promise<CreateExpenseUseCaseResponse> {
    const expense = await this.expenseRepository.create({
      description,
      location,
      type,
      amount,
      date,
      user_id,
      method,
      category,
    });

    return {
      expense,
    };
  }
}
