const mongoose = require('mongoose');
const CartItemSchema = require('./cartItem').schema;

const CartSchema = new mongoose.Schema({
	contents: [CartItemSchema],
	subTotal: {
		type: Number,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	totalQuantity: {
		type: Number,
		required: true,
	},
	cartToken: {
		type: String,
		required: true,
		unique: true,
	},
});
const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
