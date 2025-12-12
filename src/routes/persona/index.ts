import express from 'express';

import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { createPersonaValidationSchema } from './validations';

const router = express.Router();

router.post('/', validationMiddleware(createPersonaValidationSchema), controllers.createPersona);
router.get('/', controllers.getAllPersona);
router.get('/:id', controllers.getPersonaById);
router.patch('/:id', controllers.updatePersona);
router.delete('/hard/:id', controllers.hardDeletePersona);
router.patch('/soft/:id', controllers.softDeletePersona);

export default router;