import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses.repository';
import { GetExpenseByIdUseCase } from '../get-expense-by-id';

export function makeGetExpenseByIdUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const getExpenseByIdUseCase = new GetExpenseByIdUseCase(
    prismaExpensesRepository,
  );

  return getExpenseByIdUseCase;
}
