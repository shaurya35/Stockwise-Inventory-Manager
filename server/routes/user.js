const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const wrapAsync = require("../middlewares/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/middleware.js");
const {
    renderSignupForm,
    signup,
    renderLoginForm,
    login,
    logout,
 } = require("../controllers/users.js");

// rendering signup page
router.get("/signup", renderSignupForm);

//signup
router.post("/signup", wrapAsync(signup));

// Login
router.get("/login", renderLoginForm);
router.post(
  "/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login" }), wrapAsync(login) );

// Logout
router.get("/logout", logout);

module.exports = router;
