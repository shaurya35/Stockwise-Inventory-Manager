const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    stocks: [{
        name: {
            type: String,
            required: true
        },
        totalUnits: {
            type: Number,
            required: true
        },
        unitsSold: {
            type: Number,
            required: true
        }
    }]
})

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

