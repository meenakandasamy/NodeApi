const express = require('express');
const { getproducts, getsingleproduct } = require('../controllers/productController'); // Make sure this path is correct
console.log(getproducts);
const router = express.Router();

router.route('/product').get(getproducts);
router.route('/product/:id').get(getsingleproduct);

module.exports = router;