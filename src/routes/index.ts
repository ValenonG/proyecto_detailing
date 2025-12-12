import express from 'express';

import persona from './persona';
import producto from './producto';
import pedido from './pedido';
import tarea from './tarea';

const router = express.Router();

router.use('/persona', persona);
router.use('/producto', producto);
router.use('/pedido', pedido);
router.use('/tarea', tarea);

export default router;