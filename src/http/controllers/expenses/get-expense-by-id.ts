import { makeGetExpenseByIdUseCase } from '@/use-cases/factories/make-get-expense-by-id';
import { Request, Response } from 'express';

export async function expenseGetById(req: Request, res: Response) {
  try {
    const getExpenseByIdUseCase = makeGetExpenseByIdUseCase();

    const { expense } = await getExpenseByIdUseCase.execute({
      id: req.params.id,
    });

    return res.status(200).send(expense);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
