import express from 'express';

import persona from './persona';
import producto from './producto';
import pedido from './pedido';

const router = express.Router();

router.use('/persona', persona);
router.use('/producto', producto);
router.use('/pedido', pedido);

export default router;