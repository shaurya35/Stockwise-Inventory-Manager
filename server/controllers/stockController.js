const Company = require("../models/companySchema.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const ExpressError = require("../middlewares/ExpressError.js");

//get all stocks
const getStocks = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let company = Company.findById(id);
  let stocks = Company.stocks;
  res.json(stocks);
});

//get a new stock form
const getNewStock = wrapAsync((req, res) => {
  res.render("./stocks/new.ejs");
});

//create a new stock
const createStock = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let { name, totalUnits, unitsSold } = req.body;
  let stock = { name, totalUnits, unitsSold };
  let company = await Company.findById(id);
  company.stocks.push(stock);
  await Company.findByIdAndUpdate(id, company);
  res.redirect(`/api/companies/${id}`);
});

//get new edit stock form
const editNewStock = wrapAsync(async (req, res) => {
  let { id, stockId } = req.params;
  let company = await Company.findById(id);
  let stock;
  for (stockObj of company.stocks) {
    if (stockObj._id == stockId) {
      stock = stockObj;
    }
  }
  res.render("./companies/stockedit.ejs", {
    company,
    stock,
  });
});
//update a stock
const updateStock = wrapAsync(async (req, res) => {
  let { id, stockId } = req.params;
  console.log(id, stockId);
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
  res.redirect(`/api/companies/${id}`);
});

//delete a company
const deleteStock = wrapAsync(async (req, res) => {
  let { id, stockId } = req.params;
  const company = await Company.findByIdAndUpdate(
    id,
    { $pull: { stocks: { _id: stockId } } },
    { new: true }
  );
  res.redirect(`/api/companies/${id}`);
});

module.exports = {
  createStock,
  updateStock,
  deleteStock,
  getNewStock,
  editNewStock,
  getStocks,
};
