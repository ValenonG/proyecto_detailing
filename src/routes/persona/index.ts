import express from 'express';

import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { createPersonaValidationSchema } from './validations';

const router = express.Router();

router.post('/', validationMiddleware(createPersonaValidationSchema), controllers.createPersona);
router.post('/', controllers.createPersona);

export default router;