const { sendOTPEmail } = require('../../utils/email');
const { generateOTP, hashOTP } = require('../../utils/otp');
const Buyer = require('../../models/Buyer');
const Seller = require('../../models/Seller');

const sendOTP = async (req, res, next) => {
  const { email } = req.body;
  try {
    let Model;
    if (req.path.includes('buyer')) {
      Model = Buyer;
    } else if (req.path.includes('seller')) {
      Model = Seller;
    } else {
      return res.status(400).json({ message: 'Invalid endpoint' });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpHash = await hashOTP(otp);

    user.otp = {
      hash: otpHash,
      createdAt: new Date(),
      isVerified: false,
      wrongAttempts: 0,
    };
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({
      status: true,
      message: 'OTP sent to email',
      data: { user_id: user._id },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = sendOTP;