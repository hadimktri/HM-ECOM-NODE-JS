const express = require('express');
const router = express.Router();     // to use the router feature of express

const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex);  //   127.0.0.1/index
router.get('/products/:productId' , shopController.getProduct)

module.exports = router;