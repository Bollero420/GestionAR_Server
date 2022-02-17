import { Router } from 'express';

import formController from '../controllers/forms';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getForms, createForm, getFormById, updateForm, deleteForm } = formController;

const router = Router();

router.get('/', authenticatedRoutes, getForms);
router.post('/add', authenticatedRoutes, createForm);
router.get('/:id', authenticatedRoutes, getFormById);
router.put('/:id', authenticatedRoutes, updateForm);
router.delete('/:id', authenticatedRoutes, deleteForm);

export default router;
