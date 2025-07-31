const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { updateProfileValidation, validate } = require('../../../middlewares/validation');
const { updateProfile } = require('../../../controllers/seller/profile');

router.patch('/', validateToken, authenticate('seller'), updateProfileValidation, validate, updateProfile);

module.exports = router;