
const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/authController.js");

// Login route
router.post("/login", login);

//signup route
router.post("/signup", signup);

module.exports = router;
