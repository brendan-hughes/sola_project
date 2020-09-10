const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/shop', require('./routes/api/shop'));
app.use('/api/nav', require('./routes/api/nav'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/charge', require('./routes/api/charge'));
app.use('/api/admin', require('./routes/api/admin'));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('./build'));
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
