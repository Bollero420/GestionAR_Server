import forms from '../controllers/forms';
import { Router } from 'express';

const router = Router();

router.get('/', forms.getForms);

router.post('/add', forms.createForm);

router.get("/:id", forms.getFormById);
router.put('/:id', forms.updateForm);
router.delete("/:id", forms.deleteForm);

export default router;