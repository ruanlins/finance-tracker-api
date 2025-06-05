import express from 'express';
import { router as usersRouter } from './http/routes/users';
import { router as walletsRouter } from './http/routes/wallets';
import { router as transactionsRouter } from './http/routes/transactions'
import { errorHandler } from './http/middlewares/errorHandles';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/wallets', walletsRouter);
app.use('/transactions', transactionsRouter)

app.use(errorHandler);