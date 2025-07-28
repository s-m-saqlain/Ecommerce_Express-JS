const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/auth');
const validateToken = require('../../middlewares/tokenValidation');
const { signupValidation, loginValidation, updateProfileValidation, changePasswordValidation, validate } = require('../../middlewares/validation');
const registerAdmin = require('../../controllers/admin/register');
const loginAdmin = require('../../controllers/admin/login');
const { getProfile, updateProfile } = require('../../controllers/admin/profile');
const changePassword = require('../../controllers/admin/changePassword');

router.post('/register', signupValidation, validate, registerAdmin);
router.post('/login', loginValidation, validate, loginAdmin);
router.get('/profile', validateToken, authenticate('admin'), getProfile);
router.patch('/profile', validateToken, authenticate('admin'), updateProfileValidation, validate, updateProfile);
router.post('/change-password', validateToken, authenticate('admin'), changePasswordValidation, validate, changePassword);

module.exports = router;