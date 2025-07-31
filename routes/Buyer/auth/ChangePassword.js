const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { changePasswordValidation, validate } = require('../../../middlewares/validation');
const changePassword = require('../../../controllers/buyer/changePassword');

router.post('/', validateToken, authenticate('buyer'), changePasswordValidation, validate, changePassword);

module.exports = router;