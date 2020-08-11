//Take ID and Amount, pass to stripe to charge
//Import stripe. Use stripe.paymentIntents.create({amount, currency, paymentmethod: id, description, confirm:true})
//Prevent double submits
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../../models/order');
const Cart = require('../../models/cart');

const stripe = new Stripe(
	'sk_test_51HE0nBAShFn2PFDAeM5lCTr3f8cITvawnWoVkIMZwp5LKqYaa41jcDFFCYzWvMZq9CjiSYozHHs26wmv62LISnF20057718sfJ'
);

router.post('/', async function (req, res) {
	try {
		const { id, customer, value, cartToken } = req.body;
		const amount = Math.round(value * 100);
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: 'CAD',
			description: 'SOLA Order',
			payment_method: id,
			confirm: true,
		});
		const currentCart = await Cart.findOne({ cartToken });
		const newOrder = new Order({
			number: id,
			cart: currentCart,
			customer,
		});
		if (payment.status === 'succeeded') {
			try {
				await newOrder.save();
				console.log('Success');
				res.send('Success');
			} catch (error) {
				console.log(error);
				res.send('Error');
			}
		}
	} catch (error) {
		console.log(error);
		res.send('Error');
	}
});

module.exports = router;
