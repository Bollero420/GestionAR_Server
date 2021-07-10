import teachers from '../controllers/teachers';
import { Router } from 'express';

const router = Router();

router.get('/', teachers.getTeachers);

router.post('/add', teachers.createTeacher);

router.get("/:id", teachers.getTeacherById);
router.put('/:id', teachers.updateTeacher);
router.delete("/:id", teachers.deleteTeacher);

export default router;