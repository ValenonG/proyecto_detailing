import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.createPedido);
router.get('/all', controllers.getAllPedidos);
router.get('/:id', controllers.getPedidoById);
router.patch('/:id', controllers.updatePedido);
router.delete('/hard/:id', controllers.hardDeletePedido);
router.patch('/soft/:id', controllers.softDeletePedido);

export default router;