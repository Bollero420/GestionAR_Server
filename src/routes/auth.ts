import { Router } from 'express';

import authController from '../controllers/auth';

const { signIn } = authController;

const router = Router();

router.post('/signIn', signIn);

export default router;
