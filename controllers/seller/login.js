const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../../models/Seller');
const TokenWhitelist = require('../../models/TokenWhitelist');
const keys = require('../../config/keys');

const loginSeller = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Seller.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user._id, role: 'seller' };
    const token = jwt.sign(payload, keys.SELLER_SECRET, { expiresIn: '1h' });

    await TokenWhitelist.create({ token, role: 'seller', userId: user._id });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = loginSeller;