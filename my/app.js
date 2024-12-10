const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, 'Config', 'Config.env') });

const products = require('./routes/product');
const order = require('./routes/order');

app.use('/api/v1', products); // Routes for product
app.use('/api/v1', order);    // Routes for order

app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT}`);
});