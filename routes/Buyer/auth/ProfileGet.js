const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/auth');
const validateToken = require('../../../middlewares/tokenValidation');
const { getProfile } = require('../../../controllers/buyer/profile');

router.get('/', validateToken, authenticate('buyer'), getProfile);

module.exports = router;