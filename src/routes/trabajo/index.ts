import express from 'express';

import controllers from './controllers';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.get('/', authenticateFirebase, controllers.getAllTrabajos);
router.post('/', authenticateFirebase, controllers.createTrabajo);
router.get('/estado/:estado', authenticateFirebase, controllers.getTrabajosByEstado);
router.get('/:id', authenticateFirebase, controllers.getTrabajoById);
router.patch('/:id', authenticateFirebase, controllers.updateTrabajo);
router.delete('/hard/:id', authenticateFirebase, controllers.hardDeleteTrabajo);
router.patch('/soft/:id', authenticateFirebase, controllers.softDeleteTrabajo);

export default router;