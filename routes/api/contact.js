const express = require('express');
const router = express.Router();
const ContactMessage = require('../../models/contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

router.post('/newsletter', async function (req, res) {
	console.log('Sending newsletter');
	const output = `
	<h3>Thanks for joining the Sola Network!</h3>
	<p>This email can be stylized and personalized for production.</p>`;

	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NEWSLETTER_EMAIL,
			pass: process.env.NEWSLETTER_PASSWORD,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail(
		{
			from: '"Brendan" <brendanhughes.sola@gmail.com>', // sender address
			to: 'brendanhughes.dev@gmail.com', // list of receivers
			subject: 'Welcome to the Sola Network!', // Subject line // plain text body
			html: output, // html body
		},
		function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log('Sent newsletter');
			}
		}
	);
});

module.exports = router;
