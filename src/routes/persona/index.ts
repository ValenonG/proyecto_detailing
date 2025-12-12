import express from 'express';

import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { registerValidationSchema, loginValidationSchema } from './validations';

const router = express.Router();

router.post('/register', validationMiddleware(registerValidationSchema), controllers.registrarPersona);
router.post('/login', validationMiddleware(loginValidationSchema), controllers.loginConEmailPassword);

export default router;