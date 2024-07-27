const Stock = require("../models/stockModel.js");
const mongoose = require("mongoose");

const allData = async (req, res) => {
  const { companyId } = req.params;
  const stocks = await Stock.find({ company: companyId });
  const sortedStocksForTopSelling = stocks.sort(
    (a, b) => b.unitsSold - a.unitsSold
  );
  const topSellingProduct = sortedStocksForTopSelling[0];
  const sortedStocksForLeastSelling = stocks.sort(
    (a, b) => a.unitsSold - b.unitsSold
  );
  const leastSellingProduct = sortedStocksForLeastSelling[0];

  const stocksWithRevenue = stocks.map((stock) => ({
    ...stock._doc,
    netRevenue: stock.unitsSold * stock.pricePerUnit,
  }));
  const totalNetRevenue = stocksWithRevenue.reduce(
    (total, stock) => total + stock.netRevenue,
    0
  );

  const totalCOGS = stocks.reduce(
    (total, stock) => total + stock.unitsSold * stock.pricePerUnit,
    0
  );

  const totalInventoryValue = stocks.reduce(
    (total, stock) => total + stock.totalUnits * stock.pricePerUnit,
    0
  );
  const averageInventoryValue = totalInventoryValue / stocks.length;
  const inventoryTurnover = totalCOGS / averageInventoryValue;

  res.status(200).json({
    topSellingProduct,
    totalNetRevenue,
    inventoryTurnover,
    leastSellingProduct,
  });
};

module.exports = {
  allData,
};
