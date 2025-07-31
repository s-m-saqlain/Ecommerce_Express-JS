const express = require('express');
const router = express.Router();
const { signupValidation, validate } = require('../../../middlewares/validation');
const registerAdmin = require('../../../controllers/admin/register');

router.post('/', signupValidation, validate, registerAdmin);

module.exports = router;