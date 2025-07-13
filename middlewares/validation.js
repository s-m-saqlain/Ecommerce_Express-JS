const { body } = require("express-validator");

exports.signupValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Must contain lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Must contain uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain a number")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Must contain a special character"),
];
