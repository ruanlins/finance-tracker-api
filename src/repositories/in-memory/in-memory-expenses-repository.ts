import { Prisma, Expense } from '@prisma/client';
import { ExpensesRepository, FindByUserIdParams } from '../expenses-repository';

export class InMemoryExpensesRepository implements ExpensesRepository {
  public items: Expense[] = [];

  async create(data: Prisma.ExpenseUncheckedCreateInput) {
    const expense = {
      id: 'expense-1',
      description: data.description,
      location: data.location,
      type: data.type,
      amount: data.amount,
      date: data.date as Date,
      user_id: data.user_id,
      method: data.method,
      category: data.category,
    };

    this.items.push(expense);

    return expense;
  }
  async delete(id: string) {
    this.items = this.items.filter((expense) => expense.id !== id);

    return null;
  }

  async findByUserId(
    id: string,
    { page = 1, category, month, year = 2024, query }: FindByUserIdParams,
  ) {
    const filteredItems = this.items
      .filter((item) => item.user_id === id)
      .filter((item) => (category ? item.category === category : true))
      .filter((item) =>
        month ? new Date(item.date).getMonth() === month : true,
      )
      .filter((item) =>
        year ? new Date(item.date).getFullYear() === year : true,
      )
      .filter((item) => (query ? item.description.includes(query) : true));

    const expense = filteredItems.slice((page - 1) * 20, page * 20);
    return expense;
  }

  async update(data: Prisma.ExpenseUncheckedUpdateInput) {
    const expense = this.items.find((expense) => data.id === expense.id);

    const updatedExpense = {
      ...expense,
      ...data,
    };

    return updatedExpense as Expense;
  }

  async findById(id: string) {
    return this.items.find((expense) => expense.id === id) || null;
  }

  async getMonthlyValue(id: string) {
    const filteredArray = this.items.filter((item) => item.user_id === id);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() - 1;
    const startDate =
      month < 0
        ? new Date(year - 1, 11, today.getDate())
        : new Date(year, month, today.getDate());

    const sum = filteredArray.reduce((acc, item) => {
      const data = new Date(item.date);
      if (data >= startDate && data <= today) {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    return sum;
  }

  async getMonthQuantity(id: string) {
    const filteredArray = this.items.filter((item) => item.user_id === id);
    return filteredArray.length;
  }
}
