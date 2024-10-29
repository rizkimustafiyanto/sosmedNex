const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController"); // Pastikan ini benar
const router = express.Router();

router.post("/login", loginUser); // Pastikan loginUser sudah didefinisikan
router.post("/register", registerUser); // Pastikan registerUser sudah didefinisikan

module.exports = router;
console.log(registerUser); // Tambahkan ini
console.log(loginUser); // Tambahkan ini
