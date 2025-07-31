const express = require('express');
const router = express.Router();
const { loginValidation, validate } = require('../../../middlewares/validation');
const loginSeller = require('../../../controllers/seller/login');

router.post('/', loginValidation, validate, loginSeller);

module.exports = router;