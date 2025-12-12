import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.createTarea);
router.get('/all', controllers.getAllTareas);
router.get('/:id', controllers.getTareaById);
router.patch('/:id', controllers.updateTarea);
router.delete('/hard/:id', controllers.hardDeleteTarea);
router.patch('/soft/:id', controllers.softDeleteTarea);

export default router;