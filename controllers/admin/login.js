const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');
const TokenWhitelist = require('../../models/TokenWhitelist');
const keys = require('../../config/keys');

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user._id, role: 'admin' };
    const token = jwt.sign(payload, keys.ADMIN_SECRET, { expiresIn: '1h' });

    await TokenWhitelist.create({ token, role: 'admin', userId: user._id });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = loginAdmin;