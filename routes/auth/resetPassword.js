const express = require('express');
const router = express.Router();
const { sendOTPValidation, verifyOTPValidation, resetPasswordValidation, validate } = require('../../middlewares/validation');
const sendOTP = require('../../controllers/resetPassword/sendOTP');
const verifyOTP = require('../../controllers/resetPassword/verifyOTP');
const resetPassword = require('../../controllers/resetPassword/reset');

router.post('/buyer/send-otp', sendOTPValidation, validate, sendOTP);
router.post('/seller/send-otp', sendOTPValidation, validate, sendOTP);
router.post('/buyer/verify-otp', verifyOTPValidation, validate, verifyOTP);
router.post('/seller/verify-otp', verifyOTPValidation, validate, verifyOTP);
router.post('/buyer/reset', resetPasswordValidation, validate, resetPassword);
router.post('/seller/reset', resetPasswordValidation, validate, resetPassword);

module.exports = router;