import attendances from '../controllers/attendances';
import { Router } from 'express';

const router = Router();

router.get('/', attendances.getAttendances);

router.post('/add', attendances.createAttendance);

router.get("/:id", attendances.getAttendanceById);
router.put('/:id', attendances.createAttendance);
router.delete("/:id", attendances.deleteAttendance);

export default router;