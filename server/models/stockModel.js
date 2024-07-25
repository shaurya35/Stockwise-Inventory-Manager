// const mongoose = require('mongoose');

// const stockSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   totalUnits: { type: Number, required: true },
//   unitsSold: { type: Number, required: true },
//   pricePerUnit: { type: Number, required: true },
//   company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
// });

// const Stock = mongoose.model('Stock', stockSchema);
// module.exports = Stock;

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalUnits: { type: Number, required: true },
  unitsSold: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;