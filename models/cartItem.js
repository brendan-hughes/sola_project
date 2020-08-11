const mongoose = require('mongoose');
const ProductSchema = require('./product').schema;

const CartItemSchema = new mongoose.Schema(
	{
		product: ProductSchema,
		quantity: {
			type: Number,
			required: true,
		},
		sku: {
			type: String,
			required: true,
		},
	},
	{ _id: false }
);
const CartItem = mongoose.model('cartItem', CartItemSchema);
module.exports = CartItem;
