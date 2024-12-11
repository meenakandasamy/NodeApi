
const express = require('express');
const { Createuser } = require('../controllers/Createuser');  // Adjust the path as needed

const router = express.Router();

// POST /api/v1/user
router.route('/user').post(Createuser);

module.exports = router;