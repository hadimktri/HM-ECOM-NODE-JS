const Product = require('../models/product')


exports.getAddProduct = (req, res) => { res.render('admin/add-product'); };

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

    product.save()
        .then(result => { console.log('Product is created'); res.redirect('/'); });
};