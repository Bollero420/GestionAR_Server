import groups from '../controllers/groups';
import { Router } from 'express';

const router = Router();

router.get('/', groups.getGroups);

router.post('/add', groups.createGroup);

router.get("/:id", groups.getGroupById);
router.put('/:id', groups.updateGroup);
router.delete("/:id", groups.deleteGroup);

export default router;