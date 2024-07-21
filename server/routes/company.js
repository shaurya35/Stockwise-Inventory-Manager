const express = require("express");
const router = express.Router();
const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  getNewCompany,
  editCompany
} = require("../controllers/companyController.js");

//Index Route
router.get("/", getCompanies);

//New Route
router.get("/new", getNewCompany);

//Create Route
router.post("/", createCompany);

//Edit Route
router.get("/:id/edit", editCompany);

//Update Route
router.put("/:id", updateCompany);

//Show Route
router.get("/:id/", getCompany);

//Delete Route
router.delete("/:id", deleteCompany);

module.exports = router;
