import { Router } from 'express';

import observationController from '../controllers/observations';
import { authenticatedRoutes } from '../middlewares/authenticated-routes';

const router = Router();

const { getObservations, createObservation, getObservationById, updateObservation, deleteObservation } =
  observationController;

router.get('/', authenticatedRoutes, getObservations);
router.post('/add', authenticatedRoutes, createObservation);
router.get('/:id', authenticatedRoutes, getObservationById);
router.put('/:id', authenticatedRoutes, updateObservation);
router.delete('/:id', authenticatedRoutes, deleteObservation);

export default router;
