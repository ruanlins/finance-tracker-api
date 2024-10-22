import { makeDeleteExpenseUseCase } from '@/use-cases/factories/make-delete-expense';
import { Request, Response } from 'express';

export async function expenseDelete(req: Request, res: Response) {
  try {
    const deleteExpenseUseCase = makeDeleteExpenseUseCase();

    await deleteExpenseUseCase.execute({
      id: req.params.id,
    });

    res.sendStatus(204);
  } catch (error) {}
}
