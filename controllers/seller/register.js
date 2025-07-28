const bcrypt = require('bcryptjs');
const Seller = require('../../models/Seller');

const registerSeller = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();

    res.status(201).json({
      message: 'Seller registered successfully',
      user: { id: seller._id, name, email, role: 'seller' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerSeller;