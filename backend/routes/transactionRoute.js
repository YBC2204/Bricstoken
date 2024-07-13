const express = require('express');
const router = express.Router();
const StellarSdk = require('stellar-sdk');

// Horizon server instance
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

async function performPayment(senderSecretKey, receiverPublicKey, amount) {
    try {
        const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecretKey);
        const senderAccount = await server.loadAccount(senderKeypair.publicKey());

        const receiverAccount = await server.loadAccount(receiverPublicKey);

        const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: amount.toString(),
            }))
            .setTimeout(30)
            .build();

        transaction.sign(senderKeypair);

        const transactionResult = await server.submitTransaction(transaction);
        console.log('Transaction successful:', transactionResult);
        return transactionResult;
    } catch (error) {
        console.error('Error performing transaction:', error.response.data);
        throw error;
    }
}

router.post('/transactions', async (req, res) => {
    const { senderSecretKey, receiverPublicKey, amount } = req.body;

    try {

        const transactionResult = await performPayment(senderSecretKey, receiverPublicKey, amount);

        res.status(200).json({ message: 'Transaction successful'});
    } catch (error) {
        res.status(500).json({ error: 'Transaction failed', message: error.message });
    }
});

module.exports = router;