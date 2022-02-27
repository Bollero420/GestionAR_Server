import { Router } from 'express';

import authController from '../controllers/auth';

const { signIn, signOut, refreshToken } = authController;

const router = Router();

router.post('/signIn', signIn);
router.get('/signOut', signOut);
router.get('/refreshToken', refreshToken);

export default router;
