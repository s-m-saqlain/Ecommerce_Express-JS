const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { changePasswordValidation, validate } = require('../../../middlewares/validation');
const changePassword = require('../../../controllers/admin/changePassword');

router.post('/', validateToken, authenticate('admin'), changePasswordValidation, validate, changePassword);

module.exports = router;