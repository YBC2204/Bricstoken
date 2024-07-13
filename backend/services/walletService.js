const { Wallet, StellarConfiguration } = require('@stellar/typescript-wallet-sdk');

// Function to create a Stellar wallet
const createWallet = async () => {
  try {

    const wallet = new Wallet({
      stellarConfiguration: StellarConfiguration.TestNet(),
    });
    const stellar = wallet.stellar();

    let account = wallet.stellar().account();

    const keypair = await account.createKeypair();

    return {
      publicKey: keypair.publicKey.toString(),
      secret: keypair.secretKey.toString(),
    };
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

module.exports = {
  createWallet,
};