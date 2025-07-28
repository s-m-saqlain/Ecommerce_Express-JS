const Seller = require('../../models/Seller');

const getProfile = async (req, res, next) => {
  try {
    if (req.tokenEntry.role !== 'seller' || req.user.id.toString() !== req.tokenEntry.userId.toString()) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const user = await Seller.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: 'seller' },
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (req.tokenEntry.role !== 'seller' || req.user.id.toString() !== req.tokenEntry.userId.toString()) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const user = await Seller.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = name;
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: 'seller' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };