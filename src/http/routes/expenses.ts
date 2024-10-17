import express from 'express';
import { verifySession } from '../middleware/verify-session';
import { expenseCreate } from '../controllers/expenses/create';

export const router = express.Router();

router.post('/create', verifySession, expenseCreate);
