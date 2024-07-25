// const mongoose = require("mongoose");
// const Company = require("../models/companyModel.js");

// // Get all companies
// const getCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find({ owner: req.user._id });
//     res.status(200).json(companies);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get a single company
// const getCompany = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid company ID" });
//   }
//   try {
//     const company = await Company.findOne({ _id: id, owner: req.user._id });
//     if (!company) {
//       return res.status(404).json({ error: "Company not found" });
//     }
//     res.status(200).json(company);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Create a new company
// const createCompany = async (req, res) => {
//   const { name, address, contactEmail, contactNumber } = req.body;
//   try {
//     const company = new Company({
//       name,
//       address,
//       contactEmail,
//       contactNumber,
//       owner: req.user._id,
//     });
//     await company.save();
//     res.status(201).json(company);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update a company
// const updateCompany = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid company ID" });
//   }
//   try {
//     const company = await Company.findOneAndUpdate(
//       { _id: id, owner: req.user._id },
//       req.body,
//       { new: true }
//     );
//     if (!company) {
//       return res.status(404).json({ error: "Company not found" });
//     }
//     res.status(200).json(company);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete a company
// const deleteCompany = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid company ID" });
//   }
//   try {
//     const company = await Company.findOneAndDelete({ _id: id, owner: req.user._id });
//     if (!company) {
//       return res.status(404).json({ error: "Company not found" });
//     }
//     res.status(200).json(company);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getCompanies,
//   getCompany,
//   createCompany,
//   updateCompany,
//   deleteCompany,
// };

const mongoose = require("mongoose");
const Company = require("../models/companyModel.js");

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single company
const getCompany = async (req, res) => {
  const { companyId } = req.params; // Use 'companyId' to match the route parameter
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  const { name, address, contactEmail, contactNumber } = req.body;
  try {
    const company = new Company({ name, address, contactEmail, contactNumber });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }
  try {
    const company = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  const { companyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ error: "Invalid company ID" });
  }
  try {
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
