const product = require('../models/product');
const Product = require('../models/product')

exports.gatProducts = (req, res) => {
    Product.find().then(products => res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' }))
        .catch(err => console.log(err));
};

exports.getAddProduct = (req, res) => res.render('admin/add-product', { path: '/add-product', pageTitle: 'Add Product', editing:false });

exports.postAddProduct = (req, res) => {

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })

    product.save()   //  3- save it
        .then(result => { console.log('Product is created'); res.redirect('/'); });
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    !editMode ? res.redirect('/') : '';

    Product.findById(prodId).then(product => {

        !product ? res.redirect('/') : '';

        res.render('admin/add-product', { product: product, pageTitle: "Edit Product", path: 'admin/edit-product', editing: editMode })
    }).catch(err => console.log(err));
};




