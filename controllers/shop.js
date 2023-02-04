const Product = require('../models/product');

exports.getIndex = (req, res) => {
    Product.find()
    .then(products => { res.render('shop/index', { prods: products, path: '/', pageTitle: 'Home' }) })
    .catch(err => console.log(err))
};





