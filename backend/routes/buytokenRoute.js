const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { buyBRICToken } = require('../services/tokenService');

router.post('/buy-token', async (req, res) => {
    const { email, amount } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Retrieve user's secret key (ensure it is securely stored)
        const userSecretKey = user.wallet.secret;
        if (!userSecretKey) {
            return res.status(500).json({ error: 'User secret key not found' });
        }

        // Call buyBRICToken with public and secret key
        await buyBRICToken(user.wallet.publicKey, userSecretKey, amount);

        // Return success response
        res.status(200).json({ message: 'Token purchase successful' });
    } catch (error) {
        // Handle errors
        console.error('Error purchasing token:', error);
        res.status(500).json({ error: 'Failed to purchase token' });
    }
});

module.exports = router;