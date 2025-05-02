import express from 'express'
import { userRegister } from '../controllers/users/register'
import { userAuthenticate } from '../controllers/users/authenticate'
import { userLogout } from '../controllers/users/logout'

export const router = express.Router()

router.post('/register', userRegister)
router.post('/authenticate', userAuthenticate)
router.post('/logout', userLogout)