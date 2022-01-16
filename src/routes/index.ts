import { Router } from 'express';
import actionRouter from './actions';
import attendanceRouter from './attendances';
import formRouter from './forms';
import gradeRouter from './grades';
import groupRouter from './groups';
import observationRouter from './observations';
import studentRouter from './students';
import studentTutorRouter from './studentTutors';
import subjectRouter from './subjects';
import subjectQualificationRouter from './subjectQualifications';
import teacherRouter from './teachers';
import userRouter from './users';
import authRouter from './login';

const router = Router();
const DEFAULT_PREFIX = '/api';

router.use(`${DEFAULT_PREFIX}/auth`, authRouter);
router.use(`${DEFAULT_PREFIX}/actions`, actionRouter);
router.use(`${DEFAULT_PREFIX}/attendances`, attendanceRouter);
router.use(`${DEFAULT_PREFIX}/forms`, formRouter);
router.use(`${DEFAULT_PREFIX}/grades`, gradeRouter);
router.use(`${DEFAULT_PREFIX}/groups`, groupRouter);
router.use(`${DEFAULT_PREFIX}/observations`, observationRouter);
router.use(`${DEFAULT_PREFIX}/students`, studentRouter);
router.use(`${DEFAULT_PREFIX}/studentTutors`, studentTutorRouter);
router.use(`${DEFAULT_PREFIX}/subjects`, subjectRouter);
router.use(`${DEFAULT_PREFIX}/subjectQualifications`, subjectQualificationRouter);
router.use(`${DEFAULT_PREFIX}/teachers`, teacherRouter);
router.use(`${DEFAULT_PREFIX}/users`, userRouter);

export default router;
