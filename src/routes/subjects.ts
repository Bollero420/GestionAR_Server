import subjects from '../controllers/subjects';
import { Router } from 'express';

const router = Router();

router.get('/', subjects.getSubjects);

router.post('/add', subjects.createSubject);

router.get("/:id", subjects.getSubjectById);
router.put('/:id', subjects.updateSubject);
router.delete("/:id", subjects.deleteSubject);

export default router;