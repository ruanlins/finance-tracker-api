import { Prisma, Expense } from '@prisma/client';

export interface FindByUserIdParams {
  page?: number;
  query?: string;
  category?: string;
  year?: number;
  month?: number;
}

export interface ExpensesRepository {
  create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>;
  findByUserId(id: string, params?: FindByUserIdParams): Promise<Expense[]>;
  update(data: Prisma.ExpenseUncheckedUpdateInput): Promise<Expense>;
  delete(id: string): Promise<null>;
}
