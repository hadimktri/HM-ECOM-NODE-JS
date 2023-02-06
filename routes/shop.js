const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products-list', shopController.getProducts)
router.get('/products/:productId', shopController.getProduct)

module.exports = router;