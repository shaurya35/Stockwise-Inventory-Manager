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

const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController.js");

// get company
router.get("/", wrapAsync(getCompanies));

// create company
router.post("/", wrapAsync(createCompany));

// get company by id
router.get("/:companyId", wrapAsync(getCompany));

// update company
router.put("/:companyId", wrapAsync(updateCompany));

// delete company
router.delete("/:companyId", wrapAsync(deleteCompany));

module.exports = router;
