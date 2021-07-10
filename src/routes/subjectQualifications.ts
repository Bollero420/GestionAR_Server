import subjectQualifications from '../controllers/subjectQualifications';
import { Router } from 'express';

const router = Router();

router.get('/', subjectQualifications.getSubjectQualifications);

router.post('/add', subjectQualifications.createSubjectQualification);

router.get("/:id", subjectQualifications.getSubjectQualificationById);
router.put('/:id', subjectQualifications.updateSubjectQualification);
router.delete("/:id", subjectQualifications.deleteSubjectQualification);

export default router;