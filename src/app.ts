import express from 'express';
import {router as usersRouter} from './http/routes/users'
import { errorHandler } from './http/middlewares/errorHandles';

export const app = express();

app.use(express.json());

app.use('/users', usersRouter)

app.use(errorHandler)