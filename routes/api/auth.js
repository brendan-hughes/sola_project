//Authorizing Users with JWT
//Registering Users, Adding Users
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

//Pulling in Auth Middleware
const auth = require('../../middleware/auth');

// @route GET api/auth
// @desc Get user by ID.
// @access Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await (await User.findById(req.user.id)).isSelected(
			'-password'
		);
		console.log(user);
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @route POST api/auth
// @desc Authenticate user and get token. Use when users attempt to log in.
// @access Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email.').isEmail(),
		check('password', 'Password is required.').exists(),
	],
	async (req, res) => {
		console.log('Logging in user');
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			//Does User Exist?
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials.' }] });
			}

			//Check Password is Valid
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials.' }] });
			}

			//Return JWT
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
