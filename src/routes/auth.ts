import auth from '../controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/signIn', auth.signIn);

export default router;
