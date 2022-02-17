import { Router } from 'express';

import teacherController from '../controllers/teachers';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getTeachers, createTeacher, getTeacherById, updateTeacher, deleteTeacher } = teacherController;

const router = Router();

router.get('/', authenticatedRoutes, getTeachers);
router.post('/add', authenticatedRoutes, createTeacher);
router.get('/:id', authenticatedRoutes, getTeacherById);
router.put('/:id', authenticatedRoutes, updateTeacher);
router.delete('/:id', authenticatedRoutes, deleteTeacher);

export default router;
