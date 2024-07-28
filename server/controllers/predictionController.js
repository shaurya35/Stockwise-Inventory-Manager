const Stock = require("../models/stockModel.js");
const mongoose = require("mongoose");

const getPrediction = async (req, res) => {
  const { companyId } = req.params;
  const stocks = await Stock.find({ company: companyId });
  let predictionData=[];
  for (stock of stocks) {
    const percentageSold = (stock.unitsSold / stock.totalUnits) * 100;
    let purchaseQuantity = 0;
    if (percentageSold <= 20) {
      purchaseQuantity = 0;
    } else if (percentageSold <= 70) {
      purchaseQuantity = stock.unitsSold;
    } else {
      purchaseQuantity = stock.unitsSold + stock.totalUnits;
    }
    if(purchaseQuantity){
        predictionData.push({stockName : stock.name,purchaseQuantity});
    }
  }
  res.status(200).json(predictionData);
};

module.exports = getPrediction;
