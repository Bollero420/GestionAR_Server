import { Router } from 'express';

import userController from '../controllers/users';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getUsers, createUser, getUserById, updateUser, deleteUser } = userController;

const router = Router();

router.get('/', getUsers);
router.post('/add', createUser);
router.get('/:id', authenticatedRoutes, getUserById);
router.put('/:id', authenticatedRoutes, updateUser);
router.delete('/:id', authenticatedRoutes, deleteUser);

export default router;
