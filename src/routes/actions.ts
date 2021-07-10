
import actions from '../controllers/actions';
import { Router } from 'express';

const router = Router();

router.get('/', actions.getActions);

router.post('/add', actions.createAction);

router.get("/:id", actions.getActionById);
router.put('/:id', actions.updateAction);
router.delete("/:id", actions.deleteAction);

export default router;