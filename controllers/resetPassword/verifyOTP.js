const bcrypt = require('bcryptjs');
const Buyer = require('../../models/Buyer');
const Seller = require('../../models/Seller');

const verifyOTP = async (req, res, next) => {
  const { userId, otp } = req.body;
  try {
    let Model;
    if (req.path.includes('buyer')) {
      Model = Buyer;
    } else if (req.path.includes('seller')) {
      Model = Seller;
    } else {
      return res.status(400).json({ message: 'Invalid endpoint' });
    }

    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otp.hash) {
      return res.status(400).json({ message: 'No OTP found for this user' });
    }

    if (user.otp.isVerified) {
      return res.status(200).json({ message: 'OTP already verified' });
    }

    const otpCreatedAt = new Date(user.otp.createdAt);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000;
    if (now - otpCreatedAt > fiveMinutes) {
      user.otp = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const isMatch = await bcrypt.compare(otp, user.otp.hash);
    if (!isMatch) {
      user.otp.wrongAttempts += 1;
      if (user.otp.wrongAttempts >= 3) {
        user.otp = undefined;
        await user.save();
        return res.status(400).json({ message: 'Maximum OTP attempts exceeded' });
      }
      await user.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp.isVerified = true;
    user.otp.verifyTime = new Date();
    await user.save();

    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyOTP;