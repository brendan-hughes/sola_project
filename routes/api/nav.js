const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

router.get('/load', async function (req, res) {
	try {
		const products = await Product.find();

		const categoriesList = [];
		const brandList = [];
		products.forEach((product) => {
			if (!categoriesList.includes(product.category)) {
				categoriesList.push(product.category);
			}
			if (!brandList.includes(product.brand)) {
				brandList.push(product.brand);
			}
		});
		res.send({ categoriesList, brandList });
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/product', async function (req, res) {
	try {
		const query = req.body.query.toLowerCase();
		if (query !== '') {
			const products = await Product.find();
			const returnList = [];
			products.forEach((product) => {
				const name = product.name.toLowerCase();
				const brand = product.brand.toLowerCase();
				if (name.includes(query) || brand.includes(query)) {
					returnList.push(product);
				}
			});
			res.send({ returnList });
		} else {
			const returnList = [];
			res.send({ returnList });
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
