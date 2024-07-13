const User = require('../models/User');
const { buyBRICToken } = require('../services/tokenService');

exports.buyToken = async (req, res) => {
    const { amount } = req.body;
    const email = req.user.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userSecretKey = user.wallet.secret;
        if (!userSecretKey) {
            return res.status(500).json({ error: 'User secret key not found' });
        }

        await buyBRICToken(user.wallet.publicKey, userSecretKey, amount);

        res.status(200).json({ message: 'Token purchase successful' });
    } catch (error) {
        console.error('Error purchasing token:', error);

        if (error.status === 401) {
      return res.status(401).json({ error: 'Unauthorized: No Account' });
    }

        res.status(500).json({ error: 'Failed to purchase token' });
    }
};