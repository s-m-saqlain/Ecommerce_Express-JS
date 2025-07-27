const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // smtp.gmail.com
  port: process.env.EMAIL_PORT, // 465
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

// Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Ecommerce App" <${process.env.EMAIL_HOST_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It expires in 5 minutes.`,
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
    console.log(`✅ OTP ${otp} sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send OTP to ${email}:`, error.message);
    throw new Error("Failed to send OTP");
  }
};

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// API 1: Send OTP
exports.sendOTP = async (req, res) => {
  const { email, role } = req.body;

  try {
    let Model;
    if (role === "buyer") {
      Model = Buyer;
    } else if (role === "seller") {
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and hash OTP
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    // Update user with OTP details
    user.otp = {
      hash: otpHash,
      createdAt: new Date(),
      isVerified: false,
      wrongAttempts: 0,
    };
    await user.save();

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.json({
      status: true,
      message: "OTP sent to email",
      data: {
        user_id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// API 2: Verify OTP
exports.verifyOTP = async (req, res) => {
  const { user_id, otp, role } = req.body;

  try {
    let Model;
    if (role === "buyer") {
      Model = Buyer;
    } else if (role === "seller") {
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await Model.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || !user.otp.hash) {
      return res.status(400).json({ message: "No OTP found for this user" });
    }

    // If already verified
    if (user.otp.isVerified) {
      return res.status(200).json({ message: "OTP already verified" });
    }

    // Check if OTP is expired (5 minutes)
    const otpCreatedAt = new Date(user.otp.createdAt);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (now - otpCreatedAt > fiveMinutes) {
      user.otp = undefined; // Clear OTP
      await user.save();
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, user.otp.hash);
    if (!isMatch) {
      user.otp.wrongAttempts += 1;
      if (user.otp.wrongAttempts >= 3) {
        user.otp = undefined; // Clear OTP after 3 wrong attempts
        await user.save();
        return res
          .status(400)
          .json({ message: "Maximum OTP attempts exceeded" });
      }
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark OTP as verified
    user.otp.isVerified = true;
    user.otp.verifyTime = new Date();
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// API 3: Reset Password
exports.resetPassword = async (req, res) => {
  const { user_id, newPassword, confirmPassword, role } = req.body;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    let Model;
    if (role === "buyer") {
      Model = Buyer;
    } else if (role === "seller") {
      Model = Seller;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await Model.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || !user.otp.isVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    // Check if OTP verification is within 5 minutes
    const verifyTime = new Date(user.otp.verifyTime);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (now - verifyTime > fiveMinutes) {
      user.otp = undefined; // Clear OTP
      await user.save();
      return res.status(400).json({ message: "OTP verification has expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();

    // Invalidate all tokens for security
    await TokenWhitelist.deleteMany({ userId: user._id, role });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
