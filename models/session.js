const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
	sessionID: {
		type: String,
		required: true,
	},
	products: [String],
	transaction: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const Session = mongoose.model('session', SessionSchema);
module.exports = Session;
