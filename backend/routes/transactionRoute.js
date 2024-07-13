const express = require('express');
const router = express.Router();
const StellarSdk = require('stellar-sdk');
const User = require('../models/User');
require('dotenv').config();

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

async function performPayment(senderSecretKey, receiverPublicKey, receiverSecretKey, amount) {
    try {
        const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecretKey);
        const senderAccount = await server.loadAccount(senderKeypair.publicKey());

        let receiverAccount;
        try {
            receiverAccount = await server.loadAccount(receiverPublicKey);
        } catch (error) {
            console.error('Error loading receiver account:', error.response ? error.response.data : error.message);
            throw new Error('Receiver account not found');
        }

        // Define BRIC asset
        const assetCode = 'BRIC';
        const issuerPublicKey = process.env.ISSUER_PUBLIC_KEY;
        const bricAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);


        const trustlineExists = receiverAccount.balances.some(balance =>
            balance.asset_code === assetCode && balance.asset_issuer === issuerPublicKey
        );

        if (!trustlineExists) {
            const trustTransaction = new StellarSdk.TransactionBuilder(receiverAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: bricAsset,
                }))
                .setTimeout(30)
                .build();

            trustTransaction.sign(StellarSdk.Keypair.fromSecret(receiverSecretKey));

            try {
                await server.submitTransaction(trustTransaction);
                console.log('Trustline established for BRIC asset.');
            } catch (error) {
                console.error('Error establishing trustline:', error.response ? error.response.data : error.message);
                throw new Error('Failed to establish trustline');
            }

            // Refresh receiver account details after trustline creation
            receiverAccount = await server.loadAccount(receiverPublicKey);
        }

        // Check sender account balance for BRIC
        const senderBricBalance = senderAccount.balances.find(balance =>
            balance.asset_code === assetCode && balance.asset_issuer === issuerPublicKey
        );

        if (!senderBricBalance || parseFloat(senderBricBalance.balance) < parseFloat(amount)) {
            throw new Error('Sender account does not have enough BRIC balance');
        }

        const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: bricAsset,
                amount: amount.toString(),
            }))
            .setTimeout(30)
            .build();

        transaction.sign(senderKeypair);

        try {
            const transactionResult = await server.submitTransaction(transaction);
            console.log('Transaction successful.');
            return transactionResult;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.extras) {
                const extras = error.response.data.extras;
                console.error('Transaction failed with details:', extras);
                if (extras.result_codes) {
                    console.error('Transaction result codes:', extras.result_codes);
                }
                if (extras.result_xdr) {
                    console.error('Transaction result XDR:', extras.result_xdr);
                }
            } else {
                console.error('Error submitting transaction:', error.response ? error.response.data : error.message);
            }
            throw new Error('Transaction submission failed');
        }

    } catch (error) {
        console.error('Error performing transaction:', error);
        throw new Error('Transaction failed');
    }
}

router.post('/transactions', async (req, res) => {
    const { senderSecretKey, email, amount } = req.body;

    try {
        // Validate input
        if (!senderSecretKey || !email || !amount) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Validate amount
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const receiverPublicKey = user.wallet.publicKey;
        const receiverSecretKey = user.wallet.secret;

        try {
            const transactionResult = await performPayment(senderSecretKey, receiverPublicKey, receiverSecretKey, amount);
            console.log('Transaction successful:', transactionResult);
            res.status(200).json({ message: 'Transaction successful', transactionResult });
        } catch (error) {
            console.error('Error in performPayment:', error.message);
            if (error.message === 'Receiver account not found') {
                return res.status(404).json({ error: 'Receiver account not found' });
            } else if (error.message === 'Sender account does not have enough BRIC balance') {
                return res.status(400).json({ error: 'Sender account does not have enough BRIC balance' });
            }
            res.status(500).json({ error: 'Transaction failed', message: error.message });
        }
    } catch (error) {
        console.error('Error in transaction endpoint:', error);
        res.status(500).json({ error: 'Transaction failed', message: error.message });
    }
});