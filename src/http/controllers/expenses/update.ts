import { makeUpdateExpenseUseCase } from '@/use-cases/factories/make-update-expense';
import { $Enums } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function expenseUpdate(req: Request, res: Response) {
  const updateExpenseBodySchema = z.object({
    id: z.string(),
    description: z.string().optional(),
    location: z.string().optional(),
    type: z.nativeEnum($Enums.Type).optional(),
    amount: z.number().optional(),
    date: z.coerce.date().optional(),
    method: z.nativeEnum($Enums.Method).optional(),
    category: z.string().optional(),
  });

  const expenseBody = updateExpenseBodySchema.parse({
    ...req.body,
    id: req.params.id,
  });

  try {
    const updateExpenseUseCase = makeUpdateExpenseUseCase();

    const { expense } = await updateExpenseUseCase.execute({
      ...expenseBody,
      date: expenseBody.date ? new Date(expenseBody.date) : undefined,
    });

    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send();
  }
}
