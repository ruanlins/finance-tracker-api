import { makeCreateExpenseUseCase } from '@/use-cases/factories/make-create-expense-use-case';
import { $Enums } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

export async function expenseCreate(req: Request, res: Response) {
  const createExpenseBodySchema = z.object({
    description: z.string(),
    location: z.string(),
    type: z.nativeEnum($Enums.Type),
    amount: z.number(),
    date: z.coerce.date(),
    user_id: z.string(),
    method: z.nativeEnum($Enums.Method),
    category: z.string(),
  });

  const expenseBody = createExpenseBodySchema.parse(req.body);

  try {
    const createExpenseUseCase = makeCreateExpenseUseCase();

    const { expense } = await createExpenseUseCase.execute({
      ...expenseBody,
      date: new Date(expenseBody.date),
      user_id: req.session.user?.id as string,
    });

    return res.status(201).send(expense);
  } catch (err) {
    return res.status(500).send();
  }
}
