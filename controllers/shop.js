const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products, path: '/',
                pageTitle: 'Home',
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.log(err))
};

exports.getProducts = (req, res) => {
    Product.find().then(products => {
        res.render('shop/product-list', {
            prods: products,
            path: '/products',
            pageTitle: 'Products',
            isAuthenticated: req.isLoggedIn
        })
    })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: 'products',
            isAuthenticated: req.isLoggedIn
        })
    }).catch(err => { console.log(err) });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            req.user.addToCart(product);
        })
}

exports.getCart = async (req, res) => {
    const user = await req.user.populate('cart.items.productId');
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: user.cart.items,
        isAuthenticated: req.isLoggedIn
    });
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        }).catch(err => {
            console.log(err);
        })
}

exports.postOrder = (req, res) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc }     // to show whole object details use __doc with a spread oprator make a copy of the details             
                }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            })

            return order.save();
        }).then(() => {
            return req.user.clearCart();
        }).then(() => {
            res.redirect('/orders');
        }).catch(err => {
            console.log(err);
        });
}

exports.getOrder = (req, res) => {
    Order.find({
        'user.userId': req.user._id
    })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: "Orders",
                path: "/orders",
                orders: orders,
                isAuthenticated: req.isLoggedIn
            });
        }).catch(err => {
            console.log(err)
        })
}