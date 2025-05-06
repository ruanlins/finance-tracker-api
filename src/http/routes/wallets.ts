import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { walletCreate } from '../controllers/wallets/create'

export const router = express.Router()

router.post('/create', authMiddleware, walletCreate)