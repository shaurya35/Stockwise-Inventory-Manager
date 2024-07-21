const Company = require("../models/companySchema.js");
const wrapAsync = require("../middlewares/wrapAsync.js");
const ExpressError = require("../middlewares/ExpressError.js");

//get all companies
const getCompanies = wrapAsync(async (req, res) => {
  let companies = await Company.find();
  res.render("./companies/index.ejs", {
    companies,
  });
});

//get a single company
const getCompany = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  res.render("./companies/show.ejs", {
    company,
  });
});

//get a new company form
const getNewCompany = wrapAsync((req, res) => {
  res.render("./companies/new.ejs");
});

//create a new company
const createCompany = wrapAsync(async (req, res) => {
  let { name, address } = req.body;
  let company = new Company({ name, address });
  let result = await company.save();
  res.redirect("/api/companies");
});

//get new edit company form
const editCompany = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  res.render("./companies/edit.ejs", {
    company,
  });
});

//update a company
const updateCompany = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let { name, address } = req.body;
  const updateFields = {};
  if (name) updateFields.name = name;
  if (address) updateFields.address = address;
  const company = await Company.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true }
  );
  res.redirect(`/api/companies`);
});

//delete a company
const deleteCompany = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let result = await Company.findByIdAndDelete(id);
  res.redirect("/api/companies");
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  getNewCompany,
  editCompany,
};
