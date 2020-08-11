const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/shop', require('./routes/api/shop'));
app.use('/api/nav', require('./routes/api/nav'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/charge', require('./routes/api/charge'));
app.use('/api/admin', require('./routes/api/admin'));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
