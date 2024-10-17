import express from 'express';
import { userRegister } from '../controllers/users/create';
import { userAuthenticate } from '../controllers/users/authenticate';
import { userLogout } from '../controllers/users/logout';
import { verifySession } from '../middleware/verify-session';
import { userGetProfile } from '../controllers/users/get-user-session';

export const router = express.Router();

router.get('/', userGetProfile);
router.post('/register', userRegister);
router.post('/session', userAuthenticate);
router.post('/logout', verifySession, userLogout);
