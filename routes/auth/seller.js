const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/auth');
const validateToken = require('../../middlewares/tokenValidation');
const { signupValidation, loginValidation, updateProfileValidation, changePasswordValidation, validate } = require('../../middlewares/validation');
const registerSeller = require('../../controllers/seller/register');
const loginSeller = require('../../controllers/seller/login');
const { getProfile, updateProfile } = require('../../controllers/seller/profile');
const changePassword = require('../../controllers/seller/changePassword');

router.post('/register', signupValidation, validate, registerSeller);
router.post('/login', loginValidation, validate, loginSeller);
router.get('/profile', validateToken, authenticate('seller'), getProfile);
router.patch('/profile', validateToken, authenticate('seller'), updateProfileValidation, validate, updateProfile);
router.post('/change-password', validateToken, authenticate('seller'), changePasswordValidation, validate, changePassword);

module.exports = router;