const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createWallet } = require('../services/walletService');
const logger = require('../middlewares/logger');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res){
  const { email, country, password} = req.body;

  if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  if (!country) {
        return res.status(400).json({ error: 'Country is required' });
      }
  if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }


  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { publicKey, secret } = await createWallet();

    const newUser = new User({
      email: email,
      country: country,
      password: hashedPassword,
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
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

async function loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      logger.info(`Login successful `);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      logger.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { registerUser, loginUser };