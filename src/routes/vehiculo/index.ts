import express from 'express';

import controllers from './controllers';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.get('/', authenticateFirebase, controllers.createVehiculo);
router.get('/all', authenticateFirebase, controllers.getAllVehiculos);
router.get('/:id', authenticateFirebase, controllers.getVehiculoById);
router.patch('/:id', authenticateFirebase, controllers.updateVehiculo);
router.delete('/hard/:id', authenticateFirebase, controllers.hardDeleteVehiculo);
router.patch('/soft/:id', authenticateFirebase, controllers.softDeleteVehiculo);

export default router;