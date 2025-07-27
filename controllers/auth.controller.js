const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const keys = require("../config/keys");
const TokenWhitelist = require("../models/TokenWhitelist");

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      user: { id: admin._id, name, email, role: "admin" },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerBuyer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let buyer = await Buyer.findOne({ email });
    if (buyer) return res.status(400).json({ message: "Buyer already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    buyer = new Buyer({ name, email, password: hashedPassword });
    await buyer.save();

    res.status(201).json({
      message: "Buyer registered successfully",
      user: { id: buyer._id, name, email, role: "buyer" },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerSeller = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let seller = await Seller.findOne({ email });
    if (seller)
      return res.status(400).json({ message: "Seller already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();

    res.status(201).json({
      message: "Seller registered successfully",
      user: { id: seller._id, name, email, role: "seller" },
    });
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
  const TokenWhitelist = require("../models/TokenWhitelist");
  try {
    let user, secret;
    if (role === "admin") {
      user = await Admin.findOne({ email });
      secret = keys.ADMIN_SECRET;
    } else if (role === "buyer") {
      user = await Buyer.findOne({ email });
      secret = keys.BUYER_SECRET;
    } else if (role === "seller") {
      user = await Seller.findOne({ email });
      secret = keys.SELLER_SECRET;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user._id, role };
    const token = jwt.sign(payload, secret, { expiresIn: "1m" });

    // Save token, role, and email to TokenWhitelist
    await TokenWhitelist.create({
      token,
      role,
      // email,
      userId: user._id,
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    let secret, Model;
    const tokenEntry = await TokenWhitelist.findOne({ token });
    if (!tokenEntry) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const { role, userId } = tokenEntry;

    if (role === "admin") {
      secret = keys.ADMIN_SECRET;
      Model = Admin;
    } else if (role === "buyer") {
      secret = keys.BUYER_SECRET;
      Model = Buyer;
    } else if (role === "seller") {
      secret = keys.SELLER_SECRET;
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded.id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await Model.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role },
    });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.updateProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const { name } = req.body;

  try {
    let secret, Model;
    const tokenEntry = await TokenWhitelist.findOne({ token });
    if (!tokenEntry) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const { role, userId } = tokenEntry;

    if (role === "admin") {
      secret = keys.ADMIN_SECRET;
      Model = Admin;
    } else if (role === "buyer") {
      secret = keys.BUYER_SECRET;
      Model = Buyer;
    } else if (role === "seller") {
      secret = keys.SELLER_SECRET;
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded.id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update name if provided
    if (name) {
      user.name = name;
    } else {
      return res.status(400).json({ message: "Name is required" });
    }

    // Save updated user
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: { id: user._id, name: user.name, email: user.email, role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const { oldPassword, newPassword } = req.body;

  try {
    let secret, Model;
    const tokenEntry = await TokenWhitelist.findOne({ token });
    if (!tokenEntry) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const { role, userId } = tokenEntry;

    if (role === "admin") {
      secret = keys.ADMIN_SECRET;
      Model = Admin;
    } else if (role === "buyer") {
      secret = keys.BUYER_SECRET;
      Model = Buyer;
    } else if (role === "seller") {
      secret = keys.SELLER_SECRET;
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded.id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Validate new password
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Optionally, invalidate existing tokens for security
    await TokenWhitelist.deleteMany({ userId, role });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
