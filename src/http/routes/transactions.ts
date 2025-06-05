import express from 'express'
import { createTransaction } from '../controllers/transactions/create'
import { authMiddleware } from '../middlewares/authMiddleware'

export const router = express.Router()

router.post('/create', authMiddleware,createTransaction)