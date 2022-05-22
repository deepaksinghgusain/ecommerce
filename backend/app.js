const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload())

const errorMiddleware = require('./middleware/error')

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', order);
app.use('/api/v1', products);
app.use('/api/v1', auth);

app.use(errorMiddleware);

module.exports = app;