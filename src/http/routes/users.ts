import express from 'express'
import { userRegister } from '../controllers/users/register'

export const router = express.Router()

router.post('/register', userRegister)