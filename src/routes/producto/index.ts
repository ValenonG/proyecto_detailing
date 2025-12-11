import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.createProducto);
router.get('/all', controllers.getAllProductos);
router.get('/:id', controllers.getProductoById);
router.patch('/:id', controllers.updateProducto);
router.delete('/hard/:id', controllers.hardDeleteProducto);
router.patch('/soft/:id', controllers.softDeleteProducto);

export default router;