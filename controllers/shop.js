const Product = require('../models/product');

exports.getIndex = (req, res) => {
    Product.find()
        .then(products => { res.render('shop/index', { prods: products, path: '/', pageTitle: 'Home' }) })
        .catch(err => console.log(err))
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => { res.render('shop/product-details', { product: product, pageTitle: product.title, path: 'products' }) })
        .catch(err => { console.log(err) });
}


