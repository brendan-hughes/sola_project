const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const Session = require('../../models/session');
const firebase = require('firebase/app');

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

//Create new session
router.post('/session/new/:session/:sku', async function (req, res) {
	try {
		let sessionID = req.params.session;
		let sku = req.params.sku;

		let session = new Session({
			sessionID,
			products: [sku],
		});
		await session.save();
		res.status(200).send('Successfully created session.');
	} catch (error) {}
});

//Update session
router.post('/session/update/:session/:sku', async function (req, res) {
	try {
		let sessionID = req.params.session;
		let sku = req.params.sku;

		let originalSession = await Session.findOne({ sessionID });

		let currentProducts = originalSession.products;
		let update = true;
		currentProducts.forEach((product) => {
			if (product === sku) {
				update = false;
			}
		});
		let products;
		if (update === true) {
			products = [...currentProducts, sku];
		} else {
			products = currentProducts;
		}

		const newSession = await Session.findOneAndUpdate(
			{ sessionID },
			{ products },
			{ returnOriginal: false }
		);
		res.status(200).send('Successfully updated session.');
	} catch (error) {}
});

//Get session details
router.get('/session/:session', async function (req, res) {
	try {
		let sessionID = req.params.session;

		let session = await Session.findOne({ sessionID });
		let sessionProducts = session.products;
		res.send(sessionProducts);
	} catch (error) {
		res.status(400).send('Error');
	}
});

//Get recommendations
router.get('/recommendations/:session/:sku', async function (req, res) {
	try {
		const sessionProducts = req.params.session;
		const currentProduct = req.params.sku;

		const allSessionData = await Session.find();
		const allProducts = await Product.find();

		//For each session excluding our own, tally up the occurrences that other products have been shown in sessions that include our currentProduct.
		let tallyObject = {};

		//Loop through all existing products to set up the tallyObject.
		allProducts.forEach((product) => {
			let productSku = product.sku;
			if (productSku !== currentProduct) {
				tallyObject[productSku] = 0;
			}
		});

		//Loop through all session data. If the sessions products array contains our currentProduct, loop through the array and add the hits to our tallyObject.
		allSessionData.forEach((session) => {
			if (session.products.includes(currentProduct)) {
				session.products.forEach((product) => {
					for (const productSku in tallyObject) {
						console.log(
							'Checking if ' + productSku + ' is equal to ' + product
						);
						if (productSku === product) {
							tallyObject[productSku] = tallyObject[productSku] + 1;
						}
					}
				});
			}
		});
		console.log('Tally object is...');
		console.log(tallyObject);
		//Filter the product information for the top 3 occurring products from the allProducts object.
		var sortedTallyObject = [];
		for (var product in tallyObject) {
			sortedTallyObject.push([product, tallyObject[product]]);
		}
		sortedTallyObject.sort(function (a, b) {
			return a[1] - b[1];
		});
		console.log('the sorted tally object is');
		console.log(sortedTallyObject);
		let topFromTallyObject = sortedTallyObject.slice(
			sortedTallyObject.length - 3,
			sortedTallyObject.length
		);
		console.log('Top from tally object are:');
		console.log(topFromTallyObject);

		let recommendations = allProducts.filter(function (product) {
			return (
				product.sku === topFromTallyObject[0][0] ||
				product.sku === topFromTallyObject[1][0] ||
				product.sku === topFromTallyObject[2][0]
			);
		});
		console.log('Top products are...');
		console.log(recommendations);

		//Get the product image URLs.

		// recommendations.forEach((product) => {
		// 	console.log('getting image for:');
		// 	console.log(product);
		// 	try {
		// 		if (!firebase.apps.length) {
		// 			const firebaseConfig = {
		// 				apiKey: 'AIzaSyA_yN_Qvt0JCCAKFjwoSHoa1V8G4fIq8gM',
		// 				authDomain: 'sola-b8331.firebaseapp.com',
		// 				databaseURL: 'https://sola-b8331.firebaseio.com',
		// 				projectId: 'sola-b8331',
		// 				storageBucket: 'sola-b8331.appspot.com',
		// 				messagingSenderId: '304188953924',
		// 				appId: '1:304188953924:web:0ac558f29a331c00f5f311',
		// 				measurementId: 'G-SWHNR7V607',
		// 			};
		// 			firebase.initializeApp(firebaseConfig);
		// 		}
		// 		var storage = firebase.storage();

		// 		const productImage = product.images[0];
		// 		storage
		// 			.ref(`productImages/${product.sku}/${productImage}`)
		// 			.getDownloadURL()
		// 			.then((url) => {
		// 				product.imageUrl = url;
		// 			});
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// });

		// console.log('Products with image urls');
		// console.log(recommendations);

		//Return the information to set the state.
		res.send({ recommendations });
	} catch (error) {}
});

module.exports = router;
