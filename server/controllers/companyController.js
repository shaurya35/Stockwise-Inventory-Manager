const Company = require("../models/companySchema.js");

//get all companies
module.exports.getCompanies = async (req, res) => {
  let companies = await Company.find();
  res.render("./companies/index.ejs", {companies});
};

//get a single company
module.exports.getCompany = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  res.render("./companies/show.ejs", {company});
};

//get a new company form
module.exports.getNewCompany = (req, res) => {
  res.render("./companies/new.ejs");
};

//create a new company
module.exports.createCompany =async (req, res) => {
  let { name, address } = req.body;
  let company = new Company({ name, address });
  let result = await company.save();
  res.redirect("/api/companies");
};

//get new edit company form
module.exports.editCompany = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  res.render("./companies/edit.ejs", {company});
};

//update a company
module.exports.updateCompany =async (req, res) => {
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
};

//delete a company
module.exports.deleteCompany = async (req, res) => {
  let { id } = req.params;
  let result = await Company.findByIdAndDelete(id);
  res.redirect("/api/companies");
};
