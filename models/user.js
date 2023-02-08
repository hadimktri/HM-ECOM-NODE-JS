const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, uinque: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, uinque: true, lowercase: true, minlength: 8, meaxlength: true },
    cart: { items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true } }] },
});

UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(prod => prod.productId.toString() === product._id.toString());

    const newQuantity = 1;
    const updatedcartItems = [...this.cart.items];

    if (cartProductIndex >= 0) { updatedcartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1 }

    else { updatedcartItems.push({ productId: product._id, quantity: newQuantity }) };

    this.cart = { items: updatedcartItems }
    this.save()
}

module.exports = mongoose.model('User', UserSchema);``