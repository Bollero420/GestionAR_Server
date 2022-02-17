import { Router } from 'express';

import subjectQualificationController from '../controllers/subjectQualifications';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const {
  getSubjectQualifications,
  createSubjectQualification,
  getSubjectQualificationById,
  updateSubjectQualification,
  deleteSubjectQualification,
} = subjectQualificationController;

const router = Router();

router.get('/', authenticatedRoutes, getSubjectQualifications);
router.post('/add', authenticatedRoutes, createSubjectQualification);
router.get('/:id', authenticatedRoutes, getSubjectQualificationById);
router.put('/:id', authenticatedRoutes, updateSubjectQualification);
router.delete('/:id', authenticatedRoutes, deleteSubjectQualification);

export default router;
