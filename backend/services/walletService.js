const { Wallet, StellarConfiguration } = require('@stellar/typescript-wallet-sdk');

// Function to create a Stellar wallet
const createWallet = async () => {
  try {
    // Configure the Stellar wallet for TestNet
    const wallet = new Wallet({
      stellarConfiguration: StellarConfiguration.TestNet(),
    });
    const stellar = wallet.stellar();

    let account = wallet.stellar().account();

    // Generate a new keypair (publicKey and secret)
    const keypair = await account.createKeypair();


    // Return the publicKey and secret
    return {
      publicKey: keypair.publicKey.toString(),
      secret: keypair.secretKey.toString(),
    };
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error; // Handle error appropriately in your application
  }
};

module.exports = {
  createWallet,
};