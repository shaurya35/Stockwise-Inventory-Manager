const express = require("express");
const router = express.Router({ mergeParams: true });
const Company = require("../models/companySchema.js");

const {
  createStock,
  updateStock,
  deleteStock,
  getNewStock,
  editNewStock,
  getStocks,
} = require("../controllers/stockController.js");

//Index Route
router.get("/", getStocks);

//New Route
router.get("/stocks/new", getNewStock);

//Create Route
router.post("/", createStock);

//Edit Route
router.get("/:stockId/edit", editNewStock);

//Put Route
router.put("/:stockId", updateStock);

//Delete Route
router.delete("/:stockId", deleteStock);

module.exports = router;
