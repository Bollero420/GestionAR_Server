import students from '../controllers/students';
import { Router } from 'express';

const router = Router();

router.get('/', students.getStudents);

router.post('/add', students.createStudent);

router.get("/:id", students.getStudentById);
router.put('/:id', students.updateStudent);
router.delete("/:id", students.deleteStudent);

export default router;