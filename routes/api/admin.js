const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');
const Photo = require('../../models/photo');
const auth = require('../../middleware/auth');
const fs = require('fs');
const multer = require('multer');

//Check If User Is Admin
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

router.get('/inventory', auth, async function (req, res) {
	try {
		const inventory = await Product.find();
		res.json(inventory);
	} catch (error) {
		console.log(error);
	}
});

router.post('/inventory', auth, async function (req, res) {
	try {
		const { sku, brand, description, name, category, price, stock } = req.body;

		try {
			const tryProduct = await Product.find({ sku });
			if (tryProduct.length === 1) {
				console.log('Found product, updating.');
				const product = await Product.findOneAndUpdate(
					{ sku },
					{
						sku,
						description,
						brand,
						name,
						category,
						price,
						stock,
					},
					{ returnOriginal: false }
				);
			} else {
				console.log("Couldn't find product, creating new product.");
				const newProduct = new Product({
					sku,
					description,
					name,
					brand,
					category,
					price,
					stock,
				});
				await newProduct.save();
			}
		} catch (error) {
			const newProduct = new Product({
				sku,
				description,
				name,
				brand,
				category,
				price,
				stock,
			});
			await newProduct.save();
		}

		//Send back updated inventory
		const inventory = await Product.find();
		res.json(inventory);
	} catch (error) {
		console.log(error);
	}
});

router.post('/imagesave', auth, async function (req, res) {
	try {
		const { sku, images } = req.body;

		try {
			const product = await Product.findOneAndUpdate(
				{ sku },
				{
					images,
				},
				{ returnOriginal: false }
			);
		} catch (error) {
			console.log(error);
		}

		//Send back updated inventory
		const inventory = await Product.find();
		res.json(inventory);
	} catch (error) {
		console.log(error);
	}
});

router.post('/imageremove', auth, async function (req, res) {
	try {
		const { sku, image } = req.body;
		console.log('Images in API:' + image);

		try {
			const product = await Product.findOne({ sku });
			const currentImages = product.images;
			let newImageList = [];
			currentImages.forEach((img) => {
				if (img !== image) {
					newImageList.push(img);
				}
			});
			console.log(newImageList);
			await Product.findOneAndUpdate({ sku }, { images: newImageList });
		} catch (error) {
			console.log(error);
		}

		//Send back updated inventory
		const inventory = await Product.find();
		res.json(inventory);
	} catch (error) {
		console.log(error);
	}
});

router.post('/inventory/remove/:sku', auth, async function (req, res) {
	try {
		const sku = req.params.sku;

		try {
			const product = await Product.findOneAndDelete({ sku });
		} catch (error) {
			console.log(error);
		}

		//Send back updated inventory
		const inventory = await Product.find();
		res.json(inventory);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
