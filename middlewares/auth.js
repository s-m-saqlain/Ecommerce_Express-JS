const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const authenticate = (userType) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const secret = {
        admin: keys.ADMIN_SECRET,
        buyer: keys.BUYER_SECRET,
        seller: keys.SELLER_SECRET,
      }[userType];

      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = authenticate;