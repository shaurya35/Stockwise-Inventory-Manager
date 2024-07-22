const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const wrapAsync = require("../middlewares/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/middleware.js");
const userController = require("../controllers/users.js");

//signup
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


//login
router.route("/login")
.get(userController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local" , { failureRedirect :"/login" }) ,userController.login);
//login is implemented by passport


//logout
router.get("/logout" ,userController.logout);

module.exports = router;