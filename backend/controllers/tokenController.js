//const StellarSdk = require('stellar-sdk');
//
//const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
//const networkPassphrase = StellarSdk.Networks.TESTNET;
//
//const distributorPublicKey = process.env.DISTRIBUTOR_PUBLIC_KEY;
//const distributorSecretKey = process.env.DISTRIBUTOR_SECRET_KEY;
//const issuerPublicKey = process.env.ISSUER_PUBLIC_KEY;
//const assetCode = 'BRIC';
//const bricAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);
//
//function validateKeypair(secretKey, type) {
//    try {
//        StellarSdk.Keypair.fromSecret(secretKey);
//        console.log(`${type} keypair is valid.`);
//    } catch (error) {
//        console.error(`${type} keypair is invalid: ${error.message}`);
//        throw new Error(`${type} keypair is invalid: ${error.message}`);
//    }
//}
//
//async function establishTrustlines(userPublicKey, userSecretKey, assets) {
//    const userAccount = await server.loadAccount(userPublicKey);
//
//    for (const asset of assets) {
//        if (!userAccount.balances.some(balance => balance.asset_code === asset.getCode() && balance.asset_issuer === asset.getIssuer())) {
//            const trustTransaction = new StellarSdk.TransactionBuilder(userAccount, {
//                fee: StellarSdk.BASE_FEE,
//                networkPassphrase: networkPassphrase,
//            })
//                .addOperation(StellarSdk.Operation.changeTrust({
//                    asset: asset,
//                }))
//                .setTimeout(100)
//                .build();
//
//            trustTransaction.sign(StellarSdk.Keypair.fromSecret(userSecretKey));
//
//            try {
//                await server.submitTransaction(trustTransaction);
//                console.log(`Trustline established for ${asset.getCode()}`);
//            } catch (error) {
//                console.error(`Error establishing trustline for ${asset.getCode()}:`, error.response ? error.response.data : error.message);
//                throw new Error(`Error establishing trustline for ${asset.getCode()}: ${error.message}`);
//            }
//        }
//    }
//}
//
//async function createOffer(userPublicKey, userSecretKey, buyingAsset, sellingAsset, amount, price, isBuy) {
//    try {
//        const userAccount = await server.loadAccount(userPublicKey);
//
//        const transactionBuilder = new StellarSdk.TransactionBuilder(userAccount, {
//            fee: StellarSdk.BASE_FEE,
//            networkPassphrase: networkPassphrase,
//        });
//
//        if (isBuy) {
//            transactionBuilder.addOperation(StellarSdk.Operation.manageBuyOffer({
//                buying: buyingAsset,
//                selling: sellingAsset,
//                buyAmount: amount.toString(),
//                price: price.toString(),
//            }));
//        } else {
//            transactionBuilder.addOperation(StellarSdk.Operation.manageSellOffer({
//                selling: sellingAsset,
//                buying: buyingAsset,
//                amount: amount.toString(),
//                price: price.toString(),
//            }));
//        }
//
//        const transaction = transactionBuilder.setTimeout(100).build();
//        transaction.sign(StellarSdk.Keypair.fromSecret(userSecretKey));
//
//        const result = await server.submitTransaction(transaction);
//        console.log('Offer created successfully.');
//        return result;
//    } catch (error) {
//        console.error('Error creating offer:', error.response ? error.response.data : error.message);
//        throw new Error(`Error creating offer: ${error.message}`);
//    }
//}
//
//async function buyTokenWithBRIC(userEmail, tokenCode, amount, price) {
//    // Retrieve user's public key and secret key based on userEmail from database
//    const user = await User.findOne({ email: userEmail }).exec();
//    if (!user) {
//        throw new Error('User not found');
//    }
//
//    if(userEmail!=req.user.email){
//            return res.status(404).json({ error: 'User invalid' });
//            }
//
//    const userPublicKey = user.wallet.publicKey;
//    const userSecretKey = user.wallet.secret;
//
//    const tokenAsset = new StellarSdk.Asset(tokenCode, issuerPublicKey);
//    await establishTrustlines(userPublicKey, userSecretKey, [bricAsset, tokenAsset]);
//    const buyAmount = amount; // Amount of token to buy
//    return createOffer(userPublicKey, userSecretKey, tokenAsset, bricAsset, buyAmount, price, true);
//}
//
//module.exports = {
//    buyTokenWithBRIC
//};