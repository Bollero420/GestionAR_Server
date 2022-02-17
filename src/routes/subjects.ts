import { Router } from 'express';

import subjectController from '../controllers/subjects';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getSubjects, createSubject, getSubjectById, updateSubject, deleteSubject } = subjectController;

const router = Router();

router.get('/', authenticatedRoutes, getSubjects);
router.post('/add', authenticatedRoutes, createSubject);
router.get('/:id', authenticatedRoutes, getSubjectById);
router.put('/:id', authenticatedRoutes, updateSubject);
router.delete('/:id', authenticatedRoutes, deleteSubject);

export default router;
