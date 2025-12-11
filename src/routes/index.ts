import express from 'express';

import persona from './persona';
import producto from './producto';

const router = express.Router();

router.use('/persona', persona);
router.use('/producto', producto);

export default router;