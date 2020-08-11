const mongoose = require('mongoose');
const Cart = require('./cart').schema;
const Customer = require('./customer').schema;

const OrderSchema = new mongoose.Schema({
	number: {
		type: String,
		required: true,
	},
	cart: Cart,
	customer: Customer,
	date: {
		type: Date,
		default: Date.now,
	},
});
const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
