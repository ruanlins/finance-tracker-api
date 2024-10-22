import express from 'express';
import { verifySession } from '../middleware/verify-session';
import { expenseCreate } from '../controllers/expenses/create';
import { expenseUserGet } from '../controllers/expenses/get-user-expenses';
import { expenseUpdate } from '../controllers/expenses/update';
import { expenseGetById } from '../controllers/expenses/get-expense-by-id';

export const router = express.Router();

router.get('/', verifySession, expenseUserGet);
router.get('/:id', verifySession, expenseGetById);
router.patch('/:id', verifySession, expenseUpdate);
router.post('/create', verifySession, expenseCreate);
