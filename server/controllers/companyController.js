const Company = require("../models/companySchema.js");

//get all companies
module.exports.getCompanies = async (req, res) => {
  let companies = await Company.find();
  res.status(200).json(companies);
};

//get a single company
module.exports.getCompany = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  if(!company){
    return res.status(400).json({error: "No such company"})
  }
  res.status(200).json(company);
};

//create a new company
module.exports.createCompany =async (req, res) => {
  let { name, address } = req.body;
 try{
  const company = await Company.create({ name, address });
  res.status(200).json(company);
 }
 catch(error){
  res.status(400).json({error: error.message});
 }
};

//update a company
module.exports.updateCompany =async (req, res) => {
  let { id } = req.params;
  const company = await Company.findOneAndUpdate({_id: id},{
    ...req.body
  })
  if(!company){
    return res.status(400).json({error: "No such company"})
  }
  res.status(200).json(company);f
};

//delete a company
module.exports.deleteCompany = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findOneAndDelete({_id: id});
  if(!company){
    return res.status(400).json({error: "No such company"})
  }
  res.status(200).json(company);
};



/* EJS routes */

// //get a new company form
// module.exports.getNewCompany = (req, res) => {
//   res.render("./companies/new.ejs");
// };

// //get new edit company form
// module.exports.editCompany = async (req, res) => {
//   let { id } = req.params;
//   let company = await Company.findById(id);
//   res.render("./companies/edit.ejs", {company});
// };