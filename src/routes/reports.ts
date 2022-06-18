import { Router } from 'express';

import reportController from '../controllers/reports';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const { monthlyReport, bimonthlyReport, initialAnnuallyReport, finalAnnuallyReport } = reportController;

const router = Router();

router.get('/monthly', authenticatedRoutes, monthlyReport);
router.get('/bimonthly', authenticatedRoutes, bimonthlyReport);
router.get('/annually/initial', authenticatedRoutes, initialAnnuallyReport);
router.get('/annually/final', authenticatedRoutes, finalAnnuallyReport);

export default router;
