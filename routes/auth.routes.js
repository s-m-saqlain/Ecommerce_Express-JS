const express = require('express');
const router = express.Router();
const { signupBuyer } = require('../controllers/auth.controller');
const { signupValidation } = require('../middlewares/validation');

router.post('/buyer/signup', signupValidation, signupBuyer);

module.exports = router;