const Company = require("../models/companySchema.js");

//get all stocks
module.exports.getAllStocks = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company.stocks);
};

//get a single stock
module.exports.getStock = async (req, res) => {
  let { id, stockId } = req.params;

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
module.exports.createStock = async (req, res) => {
  let { id } = req.params;
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
module.exports.updateStock = async (req, res) => {
  let { id, stockId } = req.params;
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
module.exports.deleteStock = async (req, res) => {
  let { id, stockId } = req.params;
  const company = await Company.findByIdAndUpdate(
    id,
    { $pull: { stocks: { _id: stockId } } },
    { new: true }
  );
  res.status(200).json(company);
};



/* EJS code */

// //get a new stock form
// module.exports.getNewStock = (req, res) => {
//   res.render("/stocks/new.ejs");
// };

// //get new edit stock form
// module.exports.editNewStock = async (req, res) => {
//   let { id, stockId } = req.params;
//   let company = await Company.findById(id);
//   let stock;
//   for (stockObj of company.stocks) {
//     if (stockObj._id == stockId) {
//       stock = stockObj;
//     }
//   }
//   res.render("./companies/stockedit.ejs", {
//     company,
//     stock,
//   });
// };
