const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.gatProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;