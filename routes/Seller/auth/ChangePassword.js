const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { changePasswordValidation, validate } = require('../../../middlewares/validation');
const changePassword = require('../../../controllers/seller/changePassword');

router.post('/', validateToken, authenticate('seller'), changePasswordValidation, validate, changePassword);

module.exports = router;