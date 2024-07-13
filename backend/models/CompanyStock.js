const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priceInBrics: { type: Number, required: true },
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    publicKey: { type: String, required: true },
    stocks: [stockSchema],
});

const CompanyStock = mongoose.model('CompanyStock', companySchema);

module.exports = CompanyStock;