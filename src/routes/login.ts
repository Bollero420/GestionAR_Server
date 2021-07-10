import login from '../controllers/login';
import { Router } from 'express';

const router = Router();

router.post('/signIn', login.signIn);

export default router;