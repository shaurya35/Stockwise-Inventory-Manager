const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");
const getPrediction = require("../controllers/predictionController.js");

router.get("/:companyId", isAuthenticated, wrapAsync(getPrediction));

module.exports = router;