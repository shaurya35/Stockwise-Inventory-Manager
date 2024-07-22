const express = require("express");
const router = express.Router({ mergeParams: true });
const Company = require("../models/companySchema.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const stockController = require("../controllers/stockController.js");
const {isLoggedIn , isOwner } = require("../middlewares/middleware.js");




router.route("/")
//Index Route
.get(wrapAsync(stockController.getStocks))
//Create Route
.post(isLoggedIn,wrapAsync(stockController.createStock) );


//New Route
router.get("/stocks/new",isLoggedIn, stockController.getNewStock);


router.route("/:stockId")
//Put Route
.put(wrapAsync(stockController.updateStock) )
//Delete Route
.delete(isLoggedIn,wrapAsync(stockController.deleteStock) );


//Edit Route
router.get("/:stockId/edit", wrapAsync(stockController.editNewStock));


module.exports = router;
