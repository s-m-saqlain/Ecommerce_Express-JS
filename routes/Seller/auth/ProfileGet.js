const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { getProfile } = require('../../../controllers/seller/profile');

router.get('/', validateToken, authenticate('seller'), getProfile);

module.exports = router;