// const express = require('express');
// const router = express.Router();
// const { sendOTPValidation, validate } = require('../../../middlewares/validation');
// const sendOTP = require('../../../controllers/resetPassword/sendOTP');

// router.post('/', sendOTPValidation, validate, sendOTP);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { sendOTPValidation, validate } = require('../../../middlewares/validation');
const sendOTP = require('../../../controllers/resetPassword/sendOTP');

router.post('/', sendOTPValidation, validate, sendOTP);

module.exports = router;