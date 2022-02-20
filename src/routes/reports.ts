import { Router } from 'express';

import reportController from '../controllers/reports';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { monthlyReport, bimonthlyReport, annuallyReport } = reportController;

const router = Router();

router.get('/monthly', authenticatedRoutes, monthlyReport);
router.post('/bimonthly', authenticatedRoutes, bimonthlyReport);
router.get('/annually', authenticatedRoutes, annuallyReport);

export default router;
