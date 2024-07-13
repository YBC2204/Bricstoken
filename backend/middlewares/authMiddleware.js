const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: Missing token' });

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized: User not found' });

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};


module.exports = { authenticateToken };