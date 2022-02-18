import { Router } from 'express';

import authController from '../controllers/auth';

const { signIn, signOut } = authController;

const router = Router();

router.post('/signIn', signIn);
router.get('/signOut', signOut);

export default router;
