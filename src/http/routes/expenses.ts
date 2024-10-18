import express from 'express';
import { verifySession } from '../middleware/verify-session';
import { expenseCreate } from '../controllers/expenses/create';
import { expenseUserGet } from '../controllers/expenses/get-user-expenses';

export const router = express.Router();

router.get('/', verifySession, expenseUserGet);
router.post('/create', verifySession, expenseCreate);
