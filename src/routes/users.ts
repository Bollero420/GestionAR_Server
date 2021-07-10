import users from '../controllers/users';
import { Router } from 'express';

const router = Router();

router.get('/', users.getUsers);

router.post('/add', users.createUser);

router.get("/:id", users.getUserById);
router.put('/:id', users.updateUser);
router.delete("/:id", users.deleteUser);

export default router;