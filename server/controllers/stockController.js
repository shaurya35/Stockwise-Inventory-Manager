const Company = require("../models/companySchema.js");
const mongoose = require("mongoose");

//get all stocks
const getAllStocks = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such valid id" });
  }
  let company = await Company.findById(id);
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company.stocks);
};

//get a single stock
const getStock = async (req, res) => {
  let { id, stockId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(stockId)
  ) {
    return res.status(400).json({ error: "No such valid id" });
  }
  const company = await Company.findOne({ _id: id, "stocks._id": stockId });
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  for (stock of company.stocks) {
    if (stock._id == stockId) {
      return res.status(200).json(stock);
    }
  }
  res.status(400).json({ error: "stock not found" });
};

//create a new stock
const createStock = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such valid id" });
  }
  let { name, totalUnits, unitsSold } = req.body;
  let stock = { name, totalUnits, unitsSold };
  let company = await Company.findById(id);
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  company.stocks.push(stock);
  await Company.findByIdAndUpdate(id, company);
  res.status(200).json(stock);
};

//update a stock
const updateStock = async (req, res) => {
  let { id, stockId } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(stockId)
  ) {
    return res.status(400).json({ error: "No such valid id" });
  }
  const { name, totalUnits, unitsSold } = req.body;

  const updateFields = {};
  if (name) updateFields["stocks.$.name"] = name;
  if (totalUnits !== undefined)
    updateFields["stocks.$.totalUnits"] = totalUnits;
  if (unitsSold !== undefined) updateFields["stocks.$.unitsSold"] = unitsSold;

  const company = await Company.findOneAndUpdate(
    { _id: id, "stocks._id": stockId },
    { $set: updateFields },
    { new: true }
  );
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company);
};

//delete a stock
const deleteStock = async (req, res) => {
  let { id, stockId } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(stockId)
  ) {
    return res.status(400).json({ error: "No such valid id" });
  }
  const company = await Company.findByIdAndUpdate(
    id,
    { $pull: { stocks: { _id: stockId } } },
    { new: true }
  );
  res.status(200).json(company);
};

module.exports = {
  getAllStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
