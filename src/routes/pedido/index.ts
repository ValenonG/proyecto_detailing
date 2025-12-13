import express from 'express';

import controllers from './controllers';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.get('/', authenticateFirebase, controllers.createPedido);
router.get('/all', authenticateFirebase, controllers.getAllPedidos);
router.get('/:id', authenticateFirebase, controllers.getPedidoById);
router.patch('/:id', authenticateFirebase, controllers.updatePedido);
router.delete('/hard/:id', authenticateFirebase, controllers.hardDeletePedido);
router.patch('/soft/:id', authenticateFirebase, controllers.softDeletePedido);

export default router;