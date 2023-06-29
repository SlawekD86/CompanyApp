const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAll)
router.get('/products/random', ProductsController.getRandom);
router.get('/products/:id', ProductsController.getById);
router.get('/products/', ProductsController.post);
router.get('/products/:id', ProductsController.update);
router.get('/products/:id', ProductsController.delete);

module.exports = router;