const Stock = require("../models/stockModel.js");
const mongoose = require("mongoose");

// Get all stocks for a company
const getAllStocks = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }
  try {
    const stocks = await Stock.find({ company: companyId });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single stock
const getStock = async (req, res) => {
  const { companyId, stockId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(stockId)) {
    return res.status(400).json({ error: "Invalid IDs" });
  }
  try {
    const stock = await Stock.findOne({ _id: stockId, company: companyId });
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new stock
const createStock = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }
  const { name, totalUnits, unitsSold, pricePerUnit } = req.body;
  try {
    const stock = new Stock({
      name,
      totalUnits,
      unitsSold,
      pricePerUnit,
      company: companyId,
    });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a stock
const updateStock = async (req, res) => {
  const { companyId, stockId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(stockId)) {
    return res.status(400).json({ error: "Invalid IDs" });
  }
  const updateData = { ...req.body };
  delete updateData._id;

  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: stockId, company: companyId },
      updateData,
      { new: true, runValidators: true } 
    );

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a stock
const deleteStock = async (req, res) => {
  const { companyId, stockId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(stockId)) {
    return res.status(400).json({ error: "Invalid IDs" });
  }
  try {
    const stock = await Stock.findOneAndDelete({ _id: stockId, company: companyId });
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
