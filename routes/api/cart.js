const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Product = require('../../models/product');
const CartItem = require('../../models/cartItem');

//Add To Cart
router.post('/add/:sku/:cart/:quantity', async function (req, res) {
	try {
		const sku = req.params.sku;
		const cart = req.params.cart;
		const quantity = parseInt(req.params.quantity);
		const currentCart = await Cart.findOne({ cartToken: cart });
		if (!currentCart) {
			try {
				//If they currently have nothing in their cart, create the cart and add the product with the specified quantity
				const product = await Product.findOne({ sku });
				const cartItem = new CartItem({ product, quantity, sku });
				const newCart = new Cart({
					contents: [cartItem],
					cartToken: cart,
				});
				await newCart.save();
			} catch (error) {
				console.log(error);
				res.status(500).send('Server error');
			}
		} else {
			const currentContents = currentCart.contents;
			//If cart exists, check if product exists in cart already, in which case we'll increase the quantity specified
			currentContents.forEach(async (item) => {
				if (item.sku === sku) {
					//Product was found in cart, so we increase quantity

					try {
						const updatedContents = [...currentContents];
						updatedContents.find((item, index) => {
							if (item.sku === sku) {
								item.quantity = item.quantity + quantity;
							}
						});

						await Cart.updateOne(
							{ cartToken: cart },
							{ contents: updatedContents }
						);
					} catch (error) {
						console.log(error);
					}
				} else {
					//If product is not in the cart, add Product To Cart with specified quantity
					const product = await Product.findOne({ sku });
					const cartItem = new CartItem({ product, quantity, sku });
					await Cart.updateOne(
						{ cartToken: cart },
						{ contents: [...currentContents, cartItem] }
					);
				}
			});
		}
		const result = 'Adding product number: ' + sku + ' To cart: ' + cart;
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error');
	}
});

//Load Cart Info
router.get('/load/:cart', async function (req, res) {
	try {
		const cart = req.params.cart;
		const currentCart = await Cart.findOne({ cartToken: cart });
		if (!currentCart) {
			res.send(0);
		} else {
			res.send(currentCart);
		}
	} catch (error) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
