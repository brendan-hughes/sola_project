const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

router.get('/load/:sku', async function (req, res) {
	try {
		let sku = req.params.sku;

		let product = await Product.find({ sku });
		if (!product) {
			res.status(500).send('No product found.');
		} else {
			res.send(product);
		}
	} catch (error) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
