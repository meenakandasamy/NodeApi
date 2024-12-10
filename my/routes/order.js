const express = require('express');
const { createOrder } = require('../controllers/orderController');  // Make sure this path is correct

const router = express.Router();

// Check if the `createOrder` function exists and is defined
router.route('/order').post(createOrder);  // Make sure createOrder is a valid function

module.exports = router;