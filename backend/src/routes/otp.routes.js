const router = require("express").Router();
const { sendOtp, verifyOtp } = require("../controllers/otp.controller");

router.get("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
