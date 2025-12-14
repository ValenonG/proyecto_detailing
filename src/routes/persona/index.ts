import express from 'express';

import controllers from './controllers';
import validationMiddleware from '../../middlewares/validator';
import { registerValidationSchema, loginValidationSchema } from './validations';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.post('/register', validationMiddleware(registerValidationSchema), controllers.registrarPersona);
router.post('/login', validationMiddleware(loginValidationSchema), controllers.loginConEmailPassword);

router.get('/', authenticateFirebase, controllers.getAllPersonas);
router.get('/tipo/:tipo', authenticateFirebase, controllers.getPersonasByTipo);
router.get('/:id', authenticateFirebase, controllers.getPersonaById);
router.put('/:id', authenticateFirebase, controllers.updatePersona);
router.delete('/:id', authenticateFirebase, controllers.deletePersona);

export default router;