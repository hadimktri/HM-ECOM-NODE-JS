const Product = require('../models/product') // importing product model designed with mongoose 

exports.getAddProduct = (req, res) => res.render('admin/add-product', { path: '/add-product', pageTitle: 'Add Product' });  //  to enter the page add-product

exports.postAddProduct = (req, res) => {     // three step 

    const title = req.body.title;            //1- get from the form and post it 
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({            // 2- make a new class with the values from form
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })

    product.save()   //  3- save it
        .then(result => { console.log('Product is created'); res.redirect('/'); });
};