const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');
const auth = require('../../middleware/auth');

router.get('/', auth, async function (req, res) {
	try {
		const user = await User.findById(req.user.id);
		res.json(user.isAdmin);
	} catch (error) {
		console.log(error);
		res.json(false);
	}
});

router.get('/orders', auth, async function (req, res) {
	try {
		console.log('In the API');
		const orders = await Order.find();
		console.log('Here are the orders we found: ', orders);
		// res.json(user.isAdmin);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
