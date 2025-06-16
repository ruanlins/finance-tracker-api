import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { walletCreate } from '../controllers/wallets/create'
import { walletChangeName } from '../controllers/wallets/change-name'
import { walletChangeTotal } from '../controllers/wallets/change-total'
import { getWallet } from '../controllers/wallets/get-wallet'
import { getWallets } from '../controllers/wallets/get-wallets'

export const router = express.Router()

router.get('/get-wallet/:wallet_id', authMiddleware, getWallet)
router.get('/get-wallets', authMiddleware, getWallets)
router.post('/create', authMiddleware, walletCreate)
router.patch('/edit-name/:wallet_id', authMiddleware, walletChangeName)
router.patch('/edit-total/:wallet_id', authMiddleware, walletChangeTotal)