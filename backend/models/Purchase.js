const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    email: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyStock', required: true },
    stockName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalCostInBrics: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;