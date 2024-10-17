import express, { NextFunction, Request, Response } from 'express';
import { router as usersRouter } from '@/http/routes/users';
import { router as expensesRouter } from '@/http/routes/expenses';
import { ZodError } from 'zod';
import { env } from './env';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma';

export const app = express();

app.use(express.json());

app.use(
  expressSession({
    secret: env.SESSION_SECRET,
    rolling: true,
    resave: false,
    saveUninitialized: true,
    name: 'session',
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error.', issues: err.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(500).json({ error: 'Internal Server Error' });
});
