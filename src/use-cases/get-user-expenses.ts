import { Expense } from '@prisma/client';
import {
  ExpensesRepository,
  FindByUserIdParams,
} from '@/repositories/expenses-repository';

interface GetUserExpensesUseCaseRequest {
  id: string;
  params?: FindByUserIdParams;
}

interface GetUserExpensesUseCaseResponse {
  expenses: Expense[];
}

export class GetUserExpensesUseCase {
  constructor(private expenseRepository: ExpensesRepository) {}

  async execute({
    id,
    params,
  }: GetUserExpensesUseCaseRequest): Promise<GetUserExpensesUseCaseResponse> {
    const expenses = await this.expenseRepository.findByUserId(id, params);

    return { expenses };
  }
}
