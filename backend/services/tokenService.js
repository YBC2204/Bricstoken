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


async function buyBRICToken(userPublicKey, userSecretKey, amount) {
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
                console.log('Trustline established:', trustResult);
            } catch (error) {
                console.error('Error establishing trustline:', error.response ? error.response.data : error.message);
                return;
            }

            userAccount = await server.loadAccount(userPublicKey);
        }

        const transaction = new StellarSdk.TransactionBuilder(distributorAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: networkPassphrase,
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: userPublicKey,
                asset: bricAsset,
                amount: amount.toString(),
            }))
            .setTimeout(100)
            .build();

        transaction.sign(StellarSdk.Keypair.fromSecret(distributorSecretKey));

        const result = await server.submitTransaction(transaction);
        console.log('BRIC token purchased.');
    } catch (error) {
        console.error('Error purchasing BRIC token:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.extras) {
            console.error('Result codes:', error.response.data.extras.result_codes);
        }
    }
}

module.exports = {
    buyBRICToken,
};