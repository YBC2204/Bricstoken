const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createWallet } = require('../services/walletService');

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {

    const { publicKey, secret } = await createWallet();

    const newUser = new User({
      email: email,
      wallet: {
        publicKey: publicKey,
        secret: secret,
      },
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        wallet: newUser.wallet,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;