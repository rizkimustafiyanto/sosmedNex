const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
console.log(registerUser);
console.log(loginUser);
