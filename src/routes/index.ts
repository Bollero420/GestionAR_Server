import { Router } from 'express';

import actionsRouter from './actions';
import attendancesRouter from './attendances';
import formsRouter from './forms';
import gradesRouter from './grades';
import groupsRouter from './groups';
import observationsRouter from './observations';
import studentsRouter from './students';
import studentTutorsRouter from './studentTutors';
import subjectsRouter from './subjects';
import subjectQualificationsRouter from './subjectQualifications';
import teachersRouter from './teachers';
import usersRouter from './users';
import authRouter from './auth';
import reportsRouter from './reports';

const router = Router();
const DEFAULT_PREFIX = '/api';

router.use(`${DEFAULT_PREFIX}/auth`, authRouter);
router.use(`${DEFAULT_PREFIX}/actions`, actionsRouter);
router.use(`${DEFAULT_PREFIX}/attendances`, attendancesRouter);
router.use(`${DEFAULT_PREFIX}/forms`, formsRouter);
router.use(`${DEFAULT_PREFIX}/grades`, gradesRouter);
router.use(`${DEFAULT_PREFIX}/groups`, groupsRouter);
router.use(`${DEFAULT_PREFIX}/observations`, observationsRouter);
router.use(`${DEFAULT_PREFIX}/students`, studentsRouter);
router.use(`${DEFAULT_PREFIX}/studentTutors`, studentTutorsRouter);
router.use(`${DEFAULT_PREFIX}/subjects`, subjectsRouter);
router.use(`${DEFAULT_PREFIX}/subjectQualifications`, subjectQualificationsRouter);
router.use(`${DEFAULT_PREFIX}/teachers`, teachersRouter);
router.use(`${DEFAULT_PREFIX}/users`, usersRouter);
router.use(`${DEFAULT_PREFIX}/reports`, reportsRouter);

export default router;
