import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses.repository';
import { DeleteExpenseUseCase } from '../delete-expense';

export function makeDeleteExpenseUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const deleteExpenseUseCase = new DeleteExpenseUseCase(
    prismaExpensesRepository,
  );

  return deleteExpenseUseCase;
}
