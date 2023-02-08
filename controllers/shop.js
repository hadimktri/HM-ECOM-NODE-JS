const Product = require('../models/product');

exports.getIndex = (req, res) => {
    Product.find()
        .then(products => { res.render('shop/index', { prods: products, path: '/', pageTitle: 'Home' }) })
        .catch(err => console.log(err))
};

exports.getProducts = (req, res) => {
    Product.find().then(products => { res.render('shop/product-list', { prods: products, path: '/products', pageTitle: 'Products' }) })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-details', { product: product, pageTitle: product.title, path: 'products' })
    }).catch(err => { console.log(err) });
}

exports.postCart = (req, res) => {
    Product.findById(req.body.productId.trim())
        .then(product => {
            req.user.addToCart(product);
            res.redirect('/cart');
        })
}

exports.getCart = async (req, res) => {
    const user = await req.user.populate('cart.items.productId');
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: user.cart.items
    });
}
