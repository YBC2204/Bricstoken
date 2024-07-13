const User = require('../models/User');
const CompanyStock = require('../models/CompanyStock');
const Purchase = require('../models/Purchase');
const { performPayment } = require('../services/tokenService');
const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks.TESTNET;

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
                    companyPublicKey: company.publicKey,
                });
            });
        });
        res.status(200).json(stocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ error: 'Failed to fetch stocks' });
    }
};

exports.buyStock = async (req, res) => {
    const { companyId, stockName, quantity } = req.body;
   const email = req.user.email;
    try {
        if (!email || !companyId || !stockName || !quantity) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        if (isNaN(quantity) || parseInt(quantity) <= 0) {
            return res.status(400).json({ error: 'Invalid quantity. Must be a positive integer.' });
        }

        if(email!=req.user.email){
            return res.status(404).json({ error: 'User invalid' });
            }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const company = await CompanyStock.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const stock = company.stocks.find(stock => stock.name === stockName);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        const totalCostInBrics = stock.priceInBrics * quantity;
        const receiverPublicKey = company.publicKey;
        const userSecretKey = user.wallet.secret;

        // Establish a trustline if it doesn't exist
        let userAccount;
        try {
            userAccount = await server.loadAccount(user.wallet.publicKey);
        } catch (error) {
            console.error('Error loading user account:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'Failed to load user account' });
        }

        const bricAsset = new StellarSdk.Asset('BRIC', process.env.ISSUER_PUBLIC_KEY);
        if (!userAccount.balances.some(balance => balance.asset_code === 'BRIC' && balance.asset_issuer === process.env.ISSUER_PUBLIC_KEY)) {
            const trustTransaction = new StellarSdk.TransactionBuilder(userAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: networkPassphrase,
            })
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: bricAsset,
                }))
                .setTimeout(100)
                .build();

            trustTransaction.sign(StellarSdk.Keypair.fromSecret(userSecretKey));

            try {
                const trustResult = await server.submitTransaction(trustTransaction);
                console.log('Trustline established');
            } catch (error) {
                console.error('Error establishing trustline:', error.response ? error.response.data : error.message);
                return res.status(500).json({ error: 'Failed to establish trustline' });
            }

            userAccount = await server.loadAccount(user.wallet.publicKey);
        }

        try {
            await performPayment(userSecretKey, receiverPublicKey, 'SBOJXKZZGWHR5KVMLJ6XCG5L2KZTKPPZYHOW53B2MGXFEKDJDSIKVV5H', totalCostInBrics.toString());

            const purchase = new Purchase({
                email,
                companyId: company._id,
                stockName: stock.name,
                quantity,
                totalCostInBrics,
                purchaseDate: new Date(),
            });
            await purchase.save();

            res.status(200).json({ message: 'Stock purchase successful' });
        } catch (error) {
            console.error('Error in performPayment:', error.message);
            if (error.message === 'Receiver account not found') {
                return res.status(404).json({ error: 'Company account not found' });
            } else if (error.message === 'Sender account does not have enough BRIC balance') {
                return res.status(400).json({ error: 'User account does not have enough BRIC balance' });
            }
            res.status(500).json({ error: 'Transaction failed', message: error.message });
        }
    } catch (error) {
        console.error('Error in stock purchase endpoint:', error);
        res.status(500).json({ error: 'Transaction failed', message: error.message });
    }
};