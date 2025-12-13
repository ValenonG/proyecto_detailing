import express from 'express';

import controllers from './controllers';
import { authenticateFirebase } from '../../middlewares/authenticateFirebase';

const router = express.Router();

router.get('/', authenticateFirebase, controllers.createProducto);
router.get('/all', authenticateFirebase, controllers.getAllProductos);
router.get('/:id', authenticateFirebase, controllers.getProductoById);
router.patch('/:id', authenticateFirebase, controllers.updateProducto);
router.delete('/hard/:id', authenticateFirebase, controllers.hardDeleteProducto);
router.patch('/soft/:id', authenticateFirebase, controllers.softDeleteProducto);

export default router;