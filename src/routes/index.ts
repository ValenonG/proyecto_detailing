import express from 'express';

import persona from './persona';

const router = express.Router();

router.use('/persona', persona);

export default router;