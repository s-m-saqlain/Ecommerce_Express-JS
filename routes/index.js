// const express = require('express');
// const router = express.Router();

// // Admin routes
// router.use('/admin/register', require('./Admin/auth/Signup'));
// router.use('/admin/login', require('./Admin/auth/Login'));
// router.use('/admin/profile', require('./Admin/auth/ProfileGet'));
// router.use('/admin/profile', require('./Admin/auth/ProfileUpdate'));
// router.use('/admin/change-password', require('./Admin/auth/ChangePassword'));

// // Buyer routes
// router.use('/buyer/register', require('./Buyer/auth/Signup'));
// router.use('/buyer/login', require('./Buyer/auth/Login'));
// router.use('/buyer/profile', require('./Buyer/auth/ProfileGet'));
// router.use('/buyer/profile', require('./Buyer/auth/ProfileUpdate'));
// router.use('/buyer/change-password', require('./Buyer/auth/ChangePassword'));

// // Seller routes
// router.use('/seller/register', require('./Seller/auth/Signup'));
// router.use('/seller/login', require('./Seller/auth/Login'));
// router.use('/seller/profile', require('./Seller/auth/ProfileGet'));
// router.use('/seller/profile', require('./Seller/auth/ProfileUpdate'));
// router.use('/seller/change-password', require('./Seller/auth/ChangePassword'));

// // Reset Password routes
// router.use('/buyer/send-otp', require('./Buyer/auth/SendOTP'));
// router.use('/buyer/verify-otp', require('./Buyer/auth/VerifyOTP'));
// router.use('/buyer/reset', require('./Buyer/auth/Reset'));
// router.use('/seller/send-otp', require('./Seller/auth/SendOTP'));
// router.use('/seller/verify-otp', require('./Seller/auth/VerifyOTP'));
// router.use('/seller/reset', require('./Seller/auth/Reset'));

// module.exports = router;

const express = require('express');
const router = express.Router();

// Admin routes
router.use('/admin/register', require('./Admin/auth/Signup'));
router.use('/admin/login', require('./Admin/auth/Login'));
router.use('/admin/profile', require('./Admin/auth/ProfileGet'));
router.use('/admin/profile', require('./Admin/auth/ProfileUpdate'));
router.use('/admin/change-password', require('./Admin/auth/ChangePassword'));

// Buyer routes
router.use('/buyer/register', require('./Buyer/auth/Signup'));
router.use('/buyer/login', require('./Buyer/auth/Login'));
router.use('/buyer/profile', require('./Buyer/auth/ProfileGet'));
router.use('/buyer/profile', require('./Buyer/auth/ProfileUpdate'));
router.use('/buyer/change-password', require('./Buyer/auth/ChangePassword'));

// Seller routes
router.use('/seller/register', require('./Seller/auth/Signup'));
router.use('/seller/login', require('./Seller/auth/Login'));
router.use('/seller/profile', require('./Seller/auth/ProfileGet'));
router.use('/seller/profile', require('./Seller/auth/ProfileUpdate'));
router.use('/seller/change-password', require('./Seller/auth/ChangePassword'));

// Reset Password routes
router.use('/buyer/send-otp', require('./Buyer/auth/SendOTP'));
router.use('/buyer/verify-otp', require('./Buyer/auth/VerifyOTP'));
router.use('/buyer/reset', require('./Buyer/auth/Reset'));
router.use('/seller/send-otp', require('./Seller/auth/SendOTP'));
router.use('/seller/verify-otp', require('./Seller/auth/VerifyOTP'));
router.use('/seller/reset', require('./Seller/auth/Reset'));

module.exports = router;