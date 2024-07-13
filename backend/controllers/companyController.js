const CompanyStock = require('../models/CompanyStock');

exports.getStocks = async (req, res) => {
    try {
        const companies = await CompanyStock.find();
        let stocks = [];
        companies.forEach(company => {
            company.stocks.forEach(stock => {
                stocks.push({
                    companyId: company._id,
                    companyName: company.name,
                    stockName: stock.name,
                    stockPriceInBrics: stock.priceInBrics,
                });
            });
        });
        res.status(200).json(stocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ error: 'Failed to fetch stocks' });
    }
};