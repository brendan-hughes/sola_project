const mongoose = require('mongoose');
const CartItemSchema = require('./cartItem').schema;

const CartSchema = new mongoose.Schema({
	contents: [CartItemSchema],
	cartToken: {
		type: String,
		required: true,
		unique: true,
	},
});
const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
