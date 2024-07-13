const StellarSdk = require('stellar-sdk');
require('dotenv').config();

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks.TESTNET;

const distributorPublicKey = process.env.DISTRIBUTOR_PUBLIC_KEY;
const distributorSecretKey = process.env.DISTRIBUTOR_SECRET_KEY;

const issuerPublicKey = process.env.ISSUER_PUBLIC_KEY;
const issuerSecretKey = process.env.ISSUER_SECRET_KEY;

const assetCode = 'BRIC';
const bricAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);

function validateKeypair(secretKey, type) {
    try {
        StellarSdk.Keypair.fromSecret(secretKey);
        console.log(`${type} keypair is valid.`);
    } catch (error) {
        console.error(`${type} keypair is invalid: ${error.message}`);
        process.exit(1);
    }
}

validateKeypair(distributorSecretKey, 'Distributor');
validateKeypair(issuerSecretKey, 'Issuer');


async function buyBRICToken(userPublicKey, userSecretKey, bricAmount) {
    try {

        try {
            StellarSdk.Keypair.fromSecret(userSecretKey);
            console.log('User keypair is valid.');
        } catch (error) {
            console.error('Invalid user keypair:', error.message);
            return;
        }

        let distributorAccount;
        try {
            distributorAccount = await server.loadAccount(distributorPublicKey);
        } catch (error) {
            console.error('Error loading distributor account:', error.response ? error.response.data : error.message);
            return;
        }

        let userAccount;
        try {
            userAccount = await server.loadAccount(userPublicKey);
        } catch (error) {
            console.error('Error loading user account:', error.response ? error.response.data : error.message);
            return;
        }

        if (!userAccount.balances.some(balance => balance.asset_code === assetCode && balance.asset_issuer === issuerPublicKey)) {
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
                return;
            }

            userAccount = await server.loadAccount(userPublicKey);
        }

        const exchangeRate = 0.1; // exchange rate
        const xlmAmount = (bricAmount * exchangeRate).toString();

        // Perform the payment operation: user sends XLM to distributor, distributor sends BRIC to user
        const paymentTransaction = new StellarSdk.TransactionBuilder(userAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: networkPassphrase,
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: distributorPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: xlmAmount,
            }))
            .setTimeout(100)
            .build();

        paymentTransaction.sign(StellarSdk.Keypair.fromSecret(userSecretKey));

        try {
            const paymentResult = await server.submitTransaction(paymentTransaction);
            console.log('XLM payment to distributor successful.');
        } catch (error) {
            console.error('Error during XLM payment:', error.response ? error.response.data : error.message);
            return;
        }

        const bricTransaction = new StellarSdk.TransactionBuilder(distributorAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: networkPassphrase,
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: userPublicKey,
                asset: bricAsset,
                amount: bricAmount.toString(),
            }))
            .setTimeout(100)
            .build();

        bricTransaction.sign(StellarSdk.Keypair.fromSecret(distributorSecretKey));

        const result = await server.submitTransaction(bricTransaction);
        console.log('BRIC token purchased successfully.');
    } catch (error) {
        console.error('Error purchasing BRIC token:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.extras) {
            console.error('Result codes:', error.response.data.extras.result_codes);
        }
    }
}

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

module.exports = {
    buyBRICToken, performPayment
};