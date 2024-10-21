import { makeGetUserExpensesUseCase } from '@/use-cases/factories/make-get-user-expenses';
import { Request, Response } from 'express';

export async function expenseUserGet(req: Request, res: Response) {
  try {
    const getUserExpensesUseCase = makeGetUserExpensesUseCase();

    const { expenses } = await getUserExpensesUseCase.execute({
      id: req.session.user?.id as string,
      params: { ...req.query },
    });

    return res.status(200).send(expenses);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
