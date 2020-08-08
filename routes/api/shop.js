const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

//Load Shop
router.get('/:category/:brand', async function (req, res) {
	try {
		let category = req.params.category;
		let brand = req.params.brand;
		brand = brand.replace('_', ' ');
		let relevantProducts;
		if (brand === 'any' && category !== 'any') {
			relevantProducts = await Product.find({ category });
		} else if (category === 'any' && brand !== 'any') {
			relevantProducts = await Product.find({ brand });
		} else if (category === 'any' && brand === 'any') {
			relevantProducts = await Product.find();
		}
		if (!relevantProducts) {
			res.status(500).send('No products found.');
		} else {
			res.send(relevantProducts);
		}
	} catch (error) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
