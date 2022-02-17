import { Router } from 'express';

import groupController from '../controllers/groups';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getGroups, createGroup, getGroupById, updateGroup, deleteGroup } = groupController;

const router = Router();

router.get('/', authenticatedRoutes, getGroups);
router.post('/add', authenticatedRoutes, createGroup);
router.get('/:id', authenticatedRoutes, getGroupById);
router.put('/:id', authenticatedRoutes, updateGroup);
router.delete('/:id', authenticatedRoutes, deleteGroup);

export default router;
