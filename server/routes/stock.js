const express = require("express");
const router = express.Router({ mergeParams: true });
const Company = require("../models/companySchema.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middlewares/middleware.js");
const {
  getAllStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/stockController.js");

//get all the stocks
router.get("/", wrapAsync(getAllStocks));
//Create a new stock
router.post("/", isLoggedIn, wrapAsync(createStock));
//get a single stock
router.get("/:stockId", wrapAsync(getStock));
//Update a stock
router.put("/:stockId", wrapAsync(updateStock));
//Delete a  stock
router.delete("/:stockId", isLoggedIn, wrapAsync(deleteStock));

module.exports = router;
