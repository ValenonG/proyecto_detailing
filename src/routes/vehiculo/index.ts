import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.createVehiculo);
router.get('/all', controllers.getAllVehiculos);
router.get('/:id', controllers.getVehiculoById);
router.patch('/:id', controllers.updateVehiculo);
router.delete('/hard/:id', controllers.hardDeleteVehiculo);
router.patch('/soft/:id', controllers.softDeleteVehiculo);

export default router;