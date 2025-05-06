import express from 'express';
import { router as usersRouter } from './http/routes/users';
import {router as walletsRouter} from './http/routes/wallets'
import { errorHandler } from './http/middlewares/errorHandles';
import cookieParser from 'cookie-parser'; 

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/wallets', walletsRouter);

app.use(errorHandler);