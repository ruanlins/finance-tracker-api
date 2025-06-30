import express from 'express'
import { createTransaction } from '../controllers/transactions/create'
import { authMiddleware } from '../middlewares/authMiddleware'
import { deleteTransaction } from '../controllers/transactions/delete'

export const router = express.Router()

router.post('/create', authMiddleware,createTransaction)
router.delete('/delete/:transaction_id',authMiddleware, deleteTransaction)