import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { walletCreate } from '../controllers/wallets/create'

import { walletChangeName } from '../controllers/wallets/change-name'

export const router = express.Router()

router.post('/create', authMiddleware, walletCreate)
router.patch('/edit/:wallet_id', authMiddleware, walletChangeName)