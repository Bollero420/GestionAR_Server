import observations from '../controllers/observations';
import { Router } from 'express';

const router = Router();

router.get('/', observations.getObservations);

router.post('/add', observations.createObservation);

router.get("/:id", observations.getObservationById);
router.put('/:id', observations.updateObservation);
router.delete("/:id", observations.deleteObservation);

export default router;