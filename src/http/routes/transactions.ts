import express from 'express'
import { createTransaction } from '../controllers/transactions/create'
import { authMiddleware } from '../middlewares/authMiddleware'
import { deleteTransaction } from '../controllers/transactions/delete'
import { updateTransaction } from '../controllers/transactions/update'
import { getMonthTransactions } from '../controllers/transactions/get-month-transactions'

export const router = express.Router()

router.post('/create', authMiddleware,createTransaction)
router.delete('/delete/:transaction_id',authMiddleware, deleteTransaction)
router.patch('/update/:transaction_id', authMiddleware, updateTransaction)
router.get('/getmonthtransactions', authMiddleware, getMonthTransactions)