const mongoose = require("mongoose");
const Company = require("../models/companySchema.js");

//get all companies
const getCompanies = async (req, res) => {
  let companies = await Company.find();
  res.status(200).json(companies);
};

//get a single company
const getCompany = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such valid id" });
  }
  let company = await Company.findById(id);
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company);
};

//create a new company
const createCompany = async (req, res) => {
  let { name, address } = req.body;
  try {
    const company = await Company.create({ name, address });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a company
const updateCompany = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such valid id" });
  }
  const company = await Company.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company);
  f;
};

//delete a company
const deleteCompany = async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such valid id" });
  }
  let company = await Company.findOneAndDelete({ _id: id });
  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  res.status(200).json(company);
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
