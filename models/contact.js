const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const ContactMessage = mongoose.model('contactMessage', ContactMessageSchema);
module.exports = ContactMessage;
