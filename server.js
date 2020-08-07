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
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
