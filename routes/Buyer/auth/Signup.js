const express = require('express');
const router = express.Router();
const { signupValidation, validate } = require('../../../middlewares/validation');
const registerBuyer = require('../../../controllers/buyer/register');

router.post('/', signupValidation, validate, registerBuyer);

module.exports = router;