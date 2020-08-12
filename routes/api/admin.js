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
		res.json(orders);
	} catch (error) {
		console.log(error);
	}
});

router.post('/orders/remove', auth, async function (req, res) {
	try {
		const id = req.body.orderID;
		const orders = await Order.findOneAndDelete({ 'cart.cartToken': id });
		res.json(orders);
	} catch (error) {
		console.log(error);
	}
});

router.post('/orders', auth, async function (req, res) {
	try {
		console.log('HERE IS THE DATA', req.body);
		const id = req.body.orderID;

		if (req.body.status !== 'nochange' && req.body.note !== 'nochange') {
			//Update both status and notes
			const update = { status: req.body.status, orderNotes: req.body.note };
			const order = await Order.findOneAndUpdate(
				{ 'cart.cartToken': id },
				update,
				{ returnOriginal: false }
			);
			res.json(order);
		} else if (req.body.status === 'nochange' && req.body.note !== 'nochange') {
			//Update just notes
			const update = { orderNotes: req.body.note };
			const order = await Order.findOneAndUpdate(
				{ 'cart.cartToken': id },
				update,
				{ returnOriginal: false }
			);
			res.json(order);
		} else if (req.body.status !== 'nochange' && req.body.note === 'nochange') {
			//Update just status
			const update = { status: req.body.status };
			const order = await Order.findOneAndUpdate(
				{ 'cart.cartToken': id },
				update,
				{ returnOriginal: false }
			);
			res.json(order);
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
