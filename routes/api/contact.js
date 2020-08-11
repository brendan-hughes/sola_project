const express = require('express');
const router = express.Router();
const ContactMessage = require('../../models/contact');

router.post('/', async function (req, res) {
	try {
		const { subject, name, email, message } = req.body;
		const contactMessage = new ContactMessage({
			subject,
			name,
			email,
			message,
		});

		await contactMessage.save();
		res.send('Success');
	} catch (error) {
		res.send('Error');
	}
});

module.exports = router;
