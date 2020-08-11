const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Product = require('../../models/product');
const CartItem = require('../../models/cartItem');

const taxRate = 1.13;
//Add To Cart
router.post('/add/:sku/:cart/:quantity', async function (req, res) {
	try {
		const sku = req.params.sku;
		const cart = req.params.cart;
		const quantity = parseInt(req.params.quantity);
		const currentCart = await Cart.findOne({ cartToken: cart });

		if (!currentCart) {
			try {
				console.log('Not found');
				//If they currently have nothing in their cart, create the cart and add the product with the specified quantity
				const product = await Product.findOne({ sku });
				const cartItem = new CartItem({ product, quantity, sku });

				const newCart = new Cart({
					contents: [cartItem],
					cartToken: cart,
					totalQuantity: quantity,
					subTotal: product.price * quantity,
					totalPrice: product.price * quantity * taxRate,
				});
				try {
					await newCart.save();
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
				return res.status(500).send('Server error');
			}
		} else {
			//If cart exists, check if product exists in cart already, in which case we'll increase the quantity specified
			const currentCartContents = currentCart.contents;
			let updatedContents = [];
			const originalLength = currentCartContents.length;
			let wasFound = false;
			currentCartContents.forEach((product) => {
				//If SKU matches, we'll update the quantity specified.
				if (product.sku === sku) {
					wasFound = true;
					let currentQuantity = product.quantity;
					let updatedQuantity = currentQuantity + quantity;
					updatedContents.push({
						product: product.product,
						quantity: updatedQuantity,
						sku: product.sku,
					});
				} else {
					//If SKU doesn't match, add it as is to the updatedContents array of products
					updatedContents.push(product);
				}
			});
			//If the product wasn't found but the cart exists, we need to add it still
			if (!wasFound) {
				const product = await Product.findOne({ sku });
				const newProduct = new CartItem({ product, quantity, sku });
				updatedContents.push(newProduct);
			}

			//Once done iterating over the cart contents, we finish up with the cart updates.
			let totalQuantity = 0;
			let subTotal = 0;
			let totalPrice = 0;
			updatedContents.forEach((product) => {
				totalQuantity = totalQuantity + product.quantity;
				subTotal = subTotal + product.quantity * product.product.price;
			});
			totalPrice = subTotal * taxRate;

			const newCart = new Cart({
				contents: updatedContents,
				cartToken: currentCart.cartToken,
				totalQuantity: totalQuantity,
				subTotal: subTotal,
				totalPrice: totalPrice,
			});
			await Cart.deleteOne({ cartToken: currentCart.cartToken });
			await newCart.save();
		}
		const resultCart = await Cart.findOne({ cartToken: cart });
		try {
			res.send(resultCart);
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server error');
	}
});

//Load Cart Info
router.get('/load/:cart', async function (req, res) {
	try {
		const cart = req.params.cart;
		const currentCart = await Cart.findOne({ cartToken: cart });
		if (!currentCart) {
			res.status(500).send('No cart found.');
		} else {
			res.send(currentCart);
		}
	} catch (error) {
		res.status(500).send('Server error');
	}
});

//Reduce Quantity
router.post('/reduce/:sku/:cart', async function (req, res) {
	try {
		const sku = req.params.sku;
		const cart = req.params.cart;
		const currentCart = await Cart.findOne({ cartToken: cart });
		currentCart.contents.forEach((product) => {
			if (product.sku === sku) {
				product.quantity = product.quantity - 1;
			}
		});
		//Once done reducing, calculate new totals for cart.
		let totalQuantity = 0;
		let subTotal = 0;
		let totalPrice = 0;
		currentCart.contents.forEach((product) => {
			totalQuantity = totalQuantity + product.quantity;
			subTotal = subTotal + product.quantity * product.product.price;
		});
		totalPrice = subTotal * taxRate;

		const newCart = new Cart({
			contents: currentCart.contents,
			cartToken: currentCart.cartToken,
			totalQuantity: totalQuantity,
			subTotal: subTotal,
			totalPrice: totalPrice,
		});
		await Cart.deleteOne({ cartToken: currentCart.cartToken });
		await newCart.save();
		res.send(newCart);
	} catch (error) {}
});

//Increase Quantity
router.post('/increase/:sku/:cart', async function (req, res) {
	try {
		const sku = req.params.sku;
		const cart = req.params.cart;
		const currentCart = await Cart.findOne({ cartToken: cart });
		currentCart.contents.forEach((product) => {
			if (product.sku === sku) {
				product.quantity = product.quantity + 1;
			}
		});
		//Once done reducing, calculate new totals for cart.
		let totalQuantity = 0;
		let subTotal = 0;
		let totalPrice = 0;
		currentCart.contents.forEach((product) => {
			totalQuantity = totalQuantity + product.quantity;
			subTotal = subTotal + product.quantity * product.product.price;
		});
		totalPrice = subTotal * taxRate;

		const newCart = new Cart({
			contents: currentCart.contents,
			cartToken: currentCart.cartToken,
			totalQuantity: totalQuantity,
			subTotal: subTotal,
			totalPrice: totalPrice,
		});
		await Cart.deleteOne({ cartToken: currentCart.cartToken });
		await newCart.save();
		res.send(newCart);
	} catch (error) {}
});

//Remove From Cart
router.post('/remove/:sku/:cart', async function (req, res) {
	try {
		const sku = req.params.sku;
		const cart = req.params.cart;
		const currentCart = await Cart.findOne({ cartToken: cart });
		currentCart.contents.forEach((product) => {
			if (product.sku === sku) {
				currentCart.contents.remove(product);
			}
		});
		//Once done removing, calculate new totals for cart.
		let totalQuantity = 0;
		let subTotal = 0;
		let totalPrice = 0;
		currentCart.contents.forEach((product) => {
			totalQuantity = totalQuantity + product.quantity;
			subTotal = subTotal + product.quantity * product.product.price;
		});
		totalPrice = subTotal * taxRate;

		const newCart = new Cart({
			contents: currentCart.contents,
			cartToken: currentCart.cartToken,
			totalQuantity: totalQuantity,
			subTotal: subTotal,
			totalPrice: totalPrice,
		});
		await Cart.deleteOne({ cartToken: currentCart.cartToken });
		await newCart.save();
		res.send(newCart);
	} catch (error) {}
});

module.exports = router;
