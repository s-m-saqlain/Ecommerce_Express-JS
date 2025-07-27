// const express = require("express");
// const router = express.Router();
// const {
//   signupBuyer,
//   signupSeller,
//   signupAdmin,
// } = require("../controllers/auth.controller");
// const { signupValidation } = require("../middlewares/validation");

// router.get("/test", (req, res) => {
//   res.send("Auth route working ✅");
// });

// router.post("/buyer/signup", signupValidation, signupBuyer);
// router.post("/seller/signup", signupValidation, signupSeller);
// router.post("/admin/signup", signupValidation, signupAdmin);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const resetPasswordController = require("../controllers/resetPassword.controller");

console.log("authController:", authController);

router.post("/admin/register", authController.registerAdmin);
router.post("/buyer/register", authController.registerBuyer);
router.post("/seller/register", authController.registerSeller);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile); // Add this line
router.patch("/update-profile", authController.updateProfile); // Add this line
router.post("/change-password", authController.changePassword); // Add this line
router.post("/reset-password/send-otp", resetPasswordController.sendOTP);
router.post("/reset-password/verify-otp", resetPasswordController.verifyOTP);
router.post("/reset-password", resetPasswordController.resetPassword);

module.exports = router;
