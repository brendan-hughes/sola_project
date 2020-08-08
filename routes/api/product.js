const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

module.exports = router;
