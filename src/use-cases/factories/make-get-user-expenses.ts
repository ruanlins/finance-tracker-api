import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses.repository';
import { GetUserExpensesUseCase } from '../get-user-expenses';

export function makeGetUserExpensesUseCase() {
  const prismaExpensesRepository = new PrismaExpensesRepository();
  const getUserExpensesUseCase = new GetUserExpensesUseCase(
    prismaExpensesRepository,
  );
  return getUserExpensesUseCase;
}
