const express = require('express');
const router = express.Router();
const Product_controller = require('../controller/Product_controller');
router.post('/create',Product_controller.addProduct);
router.get('/products',Product_controller.getProducts);
router.delete('/:id',Product_controller.deleteProducts);
router.post('/:id/update_quantity',Product_controller.updateQuantity);

module.exports = router;