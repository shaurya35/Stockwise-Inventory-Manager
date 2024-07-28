const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");
const {
    allData,
} = require("../controllers/dataControllers.js");

router.get("/:companyId", isAuthenticated, wrapAsync(allData));

module.exports = router;
