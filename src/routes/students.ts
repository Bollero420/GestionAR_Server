import { Router } from 'express';

import studentController from '../controllers/students';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } = studentController;

const router = Router();

router.get('/', authenticatedRoutes, getStudents);
router.post('/add', authenticatedRoutes, createStudent);
router.get('/:id', authenticatedRoutes, getStudentById);
router.put('/:id', authenticatedRoutes, updateStudent);
router.delete('/:id', authenticatedRoutes, deleteStudent);

export default router;
