import { Prisma, Expense } from '@prisma/client';
import { ExpensesRepository, FindByUserIdParams } from '../expenses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
    const expense = await prisma.expense.create({ data });

    return expense;
  }
  async findByUserId(
    id: string,
    { page = 1, query, category, month, year }: FindByUserIdParams,
  ): Promise<Expense[]> {
    const dateRange = month
      ? {
          lte: new Date(`${year}-${month}-31T00:00`),
          gte: new Date(`${year}-${month}-01T00:00`),
        }
      : {
          lte: new Date(`${year}-12-31T00:00`),
          gte: new Date(`${year}-01-01T00:00`),
        };

    const expenses = await prisma.expense.findMany({
      where: {
        user_id: id,
        ...(category && { category: { contains: category } }),
        ...(query && { description: { contains: query } }),
        date: dateRange,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return expenses;
  }
  async update(data: Prisma.ExpenseUncheckedUpdateInput): Promise<Expense> {
    const updatedExpense = await prisma.expense.update({
      where: { id: data.id as string },
      data,
    });

    return updatedExpense;
  }
  async delete(id: string): Promise<null> {
    await prisma.expense.delete({ where: { id } });

    return null;
  }
}
