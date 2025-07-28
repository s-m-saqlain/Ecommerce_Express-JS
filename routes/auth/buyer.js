const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/auth');
const validateToken = require('../../middlewares/tokenValidation');
const { signupValidation, loginValidation, updateProfileValidation, changePasswordValidation, validate } = require('../../middlewares/validation');
const registerBuyer = require('../../controllers/buyer/register');
const loginBuyer = require('../../controllers/buyer/login');
const { getProfile, updateProfile } = require('../../controllers/buyer/profile');
const changePassword = require('../../controllers/buyer/changePassword');

router.post('/register', signupValidation, validate, registerBuyer);
router.post('/login', loginValidation, validate, loginBuyer);
router.get('/profile', validateToken, authenticate('buyer'), getProfile);
router.patch('/profile', validateToken, authenticate('buyer'), updateProfileValidation, validate, updateProfile);
router.post('/change-password', validateToken, authenticate('buyer'), changePasswordValidation, validate, changePassword);

module.exports = router;