const Buyer = require('../models/Buyer');
const TokenWhitelist = require('../models/TokenWhitelist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const keys = require('../config/keys');

exports.signupBuyer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existing = await Buyer.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const buyer = await Buyer.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: buyer._id, role: 'buyer' }, keys.BUYER_SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d'
    });

    await TokenWhitelist.create({ token, role: 'buyer' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};