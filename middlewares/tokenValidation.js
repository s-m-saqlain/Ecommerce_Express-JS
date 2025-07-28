const TokenWhitelist = require('../models/TokenWhitelist');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const tokenEntry = await TokenWhitelist.findOne({ token });
    if (!tokenEntry) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.tokenEntry = tokenEntry;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = validateToken;