import { Router } from 'express';

import actionController from '../controllers/actions';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getActions, createAction, getActionById, updateAction, deleteAction } = actionController;

const router = Router();

router.get('/', authenticatedRoutes, getActions);
router.post('/add', authenticatedRoutes, createAction);
router.get('/:id', authenticatedRoutes, getActionById);
router.put('/:id', authenticatedRoutes, updateAction);
router.delete('/:id', authenticatedRoutes, deleteAction);

export default router;
