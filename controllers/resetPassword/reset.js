const bcrypt = require('bcryptjs');
const Buyer = require('../../models/Buyer');
const Seller = require('../../models/Seller');
const TokenWhitelist = require('../../models/TokenWhitelist');

const resetPassword = async (req, res, next) => {
  const { userId, newPassword, confirmPassword } = req.body;
  try {
    if (!userId || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'userId, newPassword, and confirmPassword are required' });
    }

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

    if (!user.otp || !user.otp.isVerified) {
      return res.status(400).json({ message: 'OTP not verified' });
    }

    const verifyTime = new Date(user.otp.verifyTime);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000;
    if (now - verifyTime > fiveMinutes) {
      user.otp = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP verification has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();

    await TokenWhitelist.deleteMany({ userId: user._id, role: req.path.includes('buyer') ? 'buyer' : 'seller' });

    res.json({
      status: true,
      message: 'Password reset successfully',
      data: { userId: user._id },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = resetPassword;