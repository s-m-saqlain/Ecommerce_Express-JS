const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const keys = require('../config/keys');

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', user: { id: admin._id, name, email, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerBuyer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let buyer = await Buyer.findOne({ email });
    if (buyer) return res.status(400).json({ message: 'Buyer already exists' });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    buyer = new Buyer({ name, email, password: hashedPassword });
    await buyer.save();

    res.status(201).json({ message: 'Buyer registered successfully', user: { id: buyer._id, name, email, role: 'buyer' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerSeller = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let seller = await Seller.findOne({ email });
    if (seller) return res.status(400).json({ message: 'Seller already exists' });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();

    res.status(201).json({ message: 'Seller registered successfully', user: { id: seller._id, name, email, role: 'seller' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     let user, secret;
//     if (role === 'admin') {
//       user = await Admin.findOne({ email });
//       secret = keys.ADMIN_SECRET;
//     } else if (role === 'buyer') {
//       user = await Buyer.findOne({ email });
//       secret = keys.BUYER_SECRET;
//     } else if (role === 'seller') {
//       user = await Seller.findOne({ email });
//       secret = keys.SELLER_SECRET;
//     } else {
//       return res.status(400).json({ message: 'Invalid role' });
//     }

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const payload = { id: user._id, role };
//     const token = jwt.sign(payload, secret, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  const TokenWhitelist = require('../models/TokenWhitelist'); // Import TokenWhitelist model
  try {
    let user, secret;
    if (role === 'admin') {
      user = await Admin.findOne({ email });
      secret = keys.ADMIN_SECRET;
    } else if (role === 'buyer') {
      user = await Buyer.findOne({ email });
      secret = keys.BUYER_SECRET;
    } else if (role === 'seller') {
      user = await Seller.findOne({ email });
      secret = keys.SELLER_SECRET;
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user._id, role };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Save token, role, and email to TokenWhitelist
    await TokenWhitelist.create({
      token,
      role,
      email, 
      userId: user._id,
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};