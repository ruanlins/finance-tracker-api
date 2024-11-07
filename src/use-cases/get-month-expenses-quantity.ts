import { ExpensesRepository } from '@/repositories/expenses-repository';
import { Expense } from '@prisma/client';

interface GetMonthExpensesQuantityUseCaseRequest {
  id: string;
}

interface GetMonthExpensesQuantityUseCaseResponse {
  quantity: number;
}

export class GetMonthQuantityUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    id,
  }: GetMonthExpensesQuantityUseCaseRequest): Promise<GetMonthExpensesQuantityUseCaseResponse> {
    const quantity = await this.expensesRepository.getMonthQuantity(id);

    return { quantity };
  }
}
