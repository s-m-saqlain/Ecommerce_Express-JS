const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Buyer = require('../../models/Buyer');
const TokenWhitelist = require('../../models/TokenWhitelist');
const keys = require('../../config/keys');

const loginBuyer = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Buyer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user._id, role: 'buyer' };
    const token = jwt.sign(payload, keys.BUYER_SECRET, { expiresIn: '1h' });

    await TokenWhitelist.create({ token, role: 'buyer', userId: user._id });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = loginBuyer;