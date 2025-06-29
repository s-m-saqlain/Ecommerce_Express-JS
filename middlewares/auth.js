const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function authenticateRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      let secret;
      if (role === 'admin') secret = keys.ADMIN_SECRET;
      if (role === 'seller') secret = keys.SELLER_SECRET;
      if (role === 'buyer') secret = keys.BUYER_SECRET;

      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = authenticateRole;