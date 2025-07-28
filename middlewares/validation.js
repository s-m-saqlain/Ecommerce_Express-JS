const { body, validationResult } = require('express-validator');

const signupValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Must contain lowercase letter')
    .matches(/[A-Z]/).withMessage('Must contain uppercase letter')
    .matches(/[0-9]/).withMessage('Must contain a number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Must contain a special character'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateProfileValidation = [
  body('name').notEmpty().withMessage('Name is required'),
];

const changePasswordValidation = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Must contain lowercase letter')
    .matches(/[A-Z]/).withMessage('Must contain uppercase letter')
    .matches(/[0-9]/).withMessage('Must contain a number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Must contain a special character'),
];

const sendOTPValidation = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
];

const verifyOTPValidation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

const resetPasswordValidation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Must contain lowercase letter')
    .matches(/[A-Z]/).withMessage('Must contain uppercase letter')
    .matches(/[0-9]/).withMessage('Must contain a number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Must contain a special character'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  sendOTPValidation,
  verifyOTPValidation,
  resetPasswordValidation,
  validate,
};