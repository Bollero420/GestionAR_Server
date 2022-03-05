import { Router } from 'express';

import attendanceController from '../controllers/attendances';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { getAttendances, createAttendance, getAttendanceById, updateAttendance, updateAttendances, deleteAttendance } =
  attendanceController;

const router = Router();

router.get('/', authenticatedRoutes, getAttendances);
router.post('/add', authenticatedRoutes, createAttendance);
router.get('/:id', authenticatedRoutes, getAttendanceById);
router.put('/update', authenticatedRoutes, updateAttendances);
router.put('/:id', authenticatedRoutes, updateAttendance);
router.delete('/:id', authenticatedRoutes, deleteAttendance);

export default router;
