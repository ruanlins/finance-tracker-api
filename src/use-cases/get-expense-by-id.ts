import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetExpenseUseCaseRequest {
  id: string;
}

interface GetExpensesUseCaseResponse {
  expense: Expense | null;
}

export class GetExpenseByIdUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    id,
  }: GetExpenseUseCaseRequest): Promise<GetExpensesUseCaseResponse> {
    const expense = await this.expensesRepository.findById(id);

    return { expense };
  }
}
