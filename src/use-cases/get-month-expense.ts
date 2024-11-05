import { ExpensesRepository } from '@/repositories/expenses-repository';

interface GetMonthExpenseUseCaseRequest {
  id: string;
}

interface GetMonthExpensesUseCaseResponse {
  value: number;
}

export class GetMonthExpenseByIdUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    id,
  }: GetMonthExpenseUseCaseRequest): Promise<GetMonthExpensesUseCaseResponse> {
    const value = await this.expensesRepository.getMonthlyValue(id);

    return { value };
  }
}
