const express = require('express');
const router = express.Router();

router.use('/admin', require('./auth/admin'));
router.use('/buyer', require('./auth/buyer'));
router.use('/seller', require('./auth/seller'));
router.use('/reset-password', require('./auth/resetPassword'));

module.exports = router;