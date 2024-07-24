const express = require("express");
const router = express.Router({ mergeParams: true });
const Company = require("../models/companySchema.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const stockController = require("../controllers/stockController.js");
const {isLoggedIn , isOwner } = require("../middlewares/middleware.js");




router.route("/")
//get all the stocks
.get(wrapAsync(stockController.getAllStocks))
//Create a new stock
.post(isLoggedIn,wrapAsync(stockController.createStock) );


//Getting a form to create a new stock EJS CODE
// router.get("/stocks/new",isLoggedIn, stockController.getNewStock);


router.route("/:stockId")
//get a single stock
.get(wrapAsync(stockController.getStock))
//Update a stock
.put(wrapAsync(stockController.updateStock) )
//Delete a  stock
.delete(isLoggedIn,wrapAsync(stockController.deleteStock) );


//Accessing a form to edit stock information with pre-filled input values. EJS CODE
// router.get("/:stockId/edit", wrapAsync(stockController.editNewStock));


module.exports = router;
