const express = require('express');
const router = express.Router();
const { loginValidation, validate } = require('../../../middlewares/validation');
const loginAdmin = require('../../../controllers/admin/login');

router.post('/', loginValidation, validate, loginAdmin);

module.exports = router;