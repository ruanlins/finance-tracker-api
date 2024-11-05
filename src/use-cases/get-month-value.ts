import { ExpensesRepository } from '@/repositories/expenses-repository';

interface GetMonthValueUseCaseRequest {
  id: string;
}

interface GetMonthValueUseCaseResponse {
  value: number;
}

export class GetMonthValueUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async execute({
    id,
  }: GetMonthValueUseCaseRequest): Promise<GetMonthValueUseCaseResponse> {
    const value = await this.expensesRepository.getMonthlyValue(id);

    return { value };
  }
}
