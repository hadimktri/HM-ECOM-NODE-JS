const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);  //   127.0.0.1/admin/add-product
router.post('/add-product', adminController.postAddProduct);

module.exports = router;