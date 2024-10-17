import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses.repository';
import { CreateExpenseUseCase } from '../create-expense';

export function makeCreateExpenseUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const createExpenseUseCase = new CreateExpenseUseCase(
    prismaExpensesRepository,
  );
  return createExpenseUseCase;
}
