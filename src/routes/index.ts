import express from 'express';

import persona from './persona';
import producto from './producto';
import pedido from './pedido';
import tarea from './tarea';
import vehiculo from './vehiculo';
import trabajo from './trabajo';

const router = express.Router();

router.use('/persona', persona);
router.use('/producto', producto);
router.use('/pedido', pedido);
router.use('/tarea', tarea);
router.use('/vehiculo', vehiculo);
router.use('/trabajo', trabajo);

export default router;