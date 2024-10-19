const Stock = require("../models/stockModel.js");

const getPrediction = async (req, res) => {
  const { companyId } = req.params;
  const stocks = await Stock.find({ company: companyId });

  let predictionData = [];

  for (let stock of stocks) {
    const percentageSold = (stock.unitsSold / stock.totalUnits) * 100;
    let purchaseQuantity = 0;
    
    if (percentageSold > 20 && percentageSold <= 70) {
      purchaseQuantity = Math.ceil((percentageSold / 100) * stock.totalUnits);
    } else if (percentageSold > 80) {
      purchaseQuantity = stock.unitsSold * 2;
    }
    
    if (purchaseQuantity > 0) {
      predictionData.push({ stockName: stock.name, purchaseQuantity });
    }
  }
  
  res.status(200).json(predictionData);
};

module.exports = getPrediction;

