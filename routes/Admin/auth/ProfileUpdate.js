const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { updateProfileValidation, validate } = require('../../../middlewares/validation');
const { updateProfile } = require('../../../controllers/admin/profile');

router.patch('/', validateToken, authenticate('admin'), updateProfileValidation, validate, updateProfile);

module.exports = router;