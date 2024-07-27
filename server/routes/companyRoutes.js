// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../middlewares/wrapAsync.js");
// const { isLoggedIn, isOwner } = require("../middlewares/authMiddleware.js");
// const {
//   getCompanies,
//   getCompany,
//   createCompany,
//   updateCompany,
//   deleteCompany,
// } = require("../controllers/companyController.js");

// // get company
// router.get("/", isLoggedIn, wrapAsync(getCompanies));

// // create company
// router.post("/", isLoggedIn, wrapAsync(createCompany));

// // get company by id
// router.get("/:companyId", isLoggedIn, wrapAsync(getCompany));

// // update company
// router.put("/:companyId", isLoggedIn, isOwner, wrapAsync(updateCompany));

// // delete company
// router.delete("/:companyId", isLoggedIn, isOwner, wrapAsync(deleteCompany));

// module.exports = router;

const express = require('express');
const router = express.Router();
const wrapAsync = require('../middlewares/wrapAsync.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companyController.js');

// get all companies
router.get('/', isAuthenticated, wrapAsync(getCompanies));

// create a company
router.post('/', isAuthenticated, wrapAsync(createCompany));

// get company by id
router.get('/:companyId', isAuthenticated, wrapAsync(getCompany));

// update company
router.put('/:companyId', isAuthenticated, wrapAsync(updateCompany));

// delete company
router.delete('/:companyId', isAuthenticated, wrapAsync(deleteCompany));

module.exports = router;

