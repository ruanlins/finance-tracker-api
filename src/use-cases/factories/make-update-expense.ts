import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses.repository';
import { EditExpenseUseCase } from '../edit-expense';

export function makeUpdateExpenseUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const updateExpenseUseCase = new EditExpenseUseCase(prismaExpensesRepository);

  return updateExpenseUseCase;
}
