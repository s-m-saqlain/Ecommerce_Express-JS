const bcrypt = require('bcryptjs');
const Buyer = require('../../models/Buyer');

const registerBuyer = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let buyer = await Buyer.findOne({ email });
    if (buyer) {
      return res.status(400).json({ message: 'Buyer already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    buyer = new Buyer({ name, email, password: hashedPassword });
    await buyer.save();

    res.status(201).json({
      message: 'Buyer registered successfully',
      user: { id: buyer._id, name, email, role: 'buyer' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerBuyer;