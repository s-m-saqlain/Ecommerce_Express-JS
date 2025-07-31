// const express = require('express');
// const router = express.Router();
// const { resetPasswordValidation, validate } = require('../../../middlewares/validation');
// const resetPassword = require('../../../controllers/resetPassword/reset');

// router.post('/', resetPasswordValidation, validate, resetPassword);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { resetPasswordValidation, validate } = require('../../../middlewares/validation');
const resetPassword = require('../../../controllers/resetPassword/reset');

router.post('/', resetPasswordValidation, validate, resetPassword);

module.exports = router;