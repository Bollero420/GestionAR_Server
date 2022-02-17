import { Router } from 'express';

import studentTutorController from '../controllers/studentTutors';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getStudentTutors, createStudentTutor, getStudentTutorById, updateStudentTutor, deleteStudentTutor } =
  studentTutorController;

const router = Router();

router.get('/', authenticatedRoutes, getStudentTutors);
router.post('/add', authenticatedRoutes, createStudentTutor);
router.get('/:id', authenticatedRoutes, getStudentTutorById);
router.put('/:id', authenticatedRoutes, updateStudentTutor);
router.delete('/:id', authenticatedRoutes, deleteStudentTutor);

export default router;
