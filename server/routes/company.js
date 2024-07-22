const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const ExpressError = require("../middlewares/ExpressError.js");
const Company = require("../models/companySchema.js");
const companyController = require("../controllers/companyController.js");
const {isLoggedIn , isOwner } = require("../middlewares/middleware.js");




router.route("/")
//Index Route
.get( wrapAsync (companyController.getCompanies) )
 //Create Route
.post(wrapAsync(companyController.createCompany) );

//New Route
router.get("/new", isLoggedIn , companyController.getNewCompany);


router.route("/:id")
//Show Route
.get(wrapAsync(companyController.getCompany) )
//Update Route
.put(isLoggedIn, wrapAsync(companyController.updateCompany))
//Delete Route
.delete(isLoggedIn, wrapAsync(companyController.deleteCompany));


//Edit Route
router.get("/:id/edit", wrapAsync(companyController.editCompany));


module.exports = router;
