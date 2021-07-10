import grades from '../controllers/grades';
import { Router } from 'express';

const router = Router();

router.get('/', grades.getGrades);

router.post('/add', grades.createGrade);

router.get("/:id", grades.getGradeById);
router.put('/:id', grades.updateGrade);
router.delete("/:id", grades.deleteGrade);

export default router;