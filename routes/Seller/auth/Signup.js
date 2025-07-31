const express = require('express');
const router = express.Router();
const { signupValidation, validate } = require('../../../middlewares/validation');
const registerSeller = require('../../../controllers/seller/register');

router.post('/', signupValidation, validate, registerSeller);

module.exports = router;