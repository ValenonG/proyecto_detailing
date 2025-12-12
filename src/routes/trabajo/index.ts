import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.createTrabajo);
router.get('/all', controllers.getAllTrabajos);
router.get('/:id', controllers.getTrabajoById);
router.patch('/:id', controllers.updateTrabajo);
router.delete('/hard/:id', controllers.hardDeleteTrabajo);
router.patch('/soft/:id', controllers.softDeleteTrabajo);

export default router;