import express from 'express';

import controllers from './controllers';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.get('/', authenticateFirebase, controllers.createTarea);
router.get('/all', controllers.getAllTareas);
router.get('/:id', authenticateFirebase, controllers.getTareaById);
router.patch('/:id', authenticateFirebase, controllers.updateTarea);
router.delete('/hard/:id', authenticateFirebase, controllers.hardDeleteTarea);
router.patch('/soft/:id', authenticateFirebase, controllers.softDeleteTarea);

export default router;