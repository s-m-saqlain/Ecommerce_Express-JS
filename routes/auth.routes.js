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

console.log("authController:", authController);

router.post("/admin/register", authController.registerAdmin);
router.post("/buyer/register", authController.registerBuyer);
router.post("/seller/register", authController.registerSeller);
router.post("/login", authController.login);

module.exports = router;
