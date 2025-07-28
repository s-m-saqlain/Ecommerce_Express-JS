const bcrypt = require('bcryptjs');
const Admin = require('../../models/Admin');

const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({
      message: 'Admin registered successfully',
      user: { id: admin._id, name, email, role: 'admin' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerAdmin;