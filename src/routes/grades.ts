import { Router } from 'express';

import gradeController from '../controllers/grades';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getGrades, createGrade, getGradeById, updateGrade, deleteGrade } = gradeController;

const router = Router();

router.get('/', authenticatedRoutes, getGrades);
router.post('/add', authenticatedRoutes, createGrade);
router.get('/:id', authenticatedRoutes, getGradeById);
router.put('/:id', authenticatedRoutes, updateGrade);
router.delete('/:id', authenticatedRoutes, deleteGrade);

export default router;
