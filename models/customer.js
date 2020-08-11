const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	shippingAddress: {
		type: String,
	},
});
const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;
