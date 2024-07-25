// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   contactEmail: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

// const Company = mongoose.model('Company', companySchema);
// module.exports = Company;

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;