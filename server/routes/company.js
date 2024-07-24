const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const ExpressError = require("../middlewares/ExpressError.js");
const Company = require("../models/companySchema.js");
const { isLoggedIn, isOwner } = require("../middlewares/middleware.js");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController.js");

router.get("/", wrapAsync(getCompanies));
router.post("/", wrapAsync(createCompany));
router.get("/:id", wrapAsync(getCompany));
router.put("/:id", isLoggedIn, wrapAsync(updateCompany));
router.delete("/:id", isLoggedIn, wrapAsync(deleteCompany));

module.exports = router;
