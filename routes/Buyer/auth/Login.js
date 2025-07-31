const express = require('express');
const router = express.Router();
const { loginValidation, validate } = require('../../../middlewares/validation');
const loginBuyer = require('../../../controllers/buyer/login');

router.post('/', loginValidation, validate, loginBuyer);

module.exports = router;