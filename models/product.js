const mongoose = require('mongoose');

const Schema = mongoose.Schema;    //new Schema class with mongoose

const productSchema = new Schema({      //new schema from Schema class

    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }

});

module.exports = mongoose.model('Product', productSchema);    // model has to be exported