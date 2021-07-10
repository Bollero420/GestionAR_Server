import studentTutors from '../controllers/studentTutors';
import { Router } from 'express';

const router = Router();

router.get('/', studentTutors.getStudentTutors);

router.post('/add', studentTutors.createStudentTutor);

router.get("/:id", studentTutors.getStudentTutorById);
router.put('/:id', studentTutors.updateStudentTutor);
router.delete("/:id", studentTutors.deleteStudentTutor);

export default router;