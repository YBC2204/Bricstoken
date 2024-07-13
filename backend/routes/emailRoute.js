const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/emails', async (req, res) => {
  try {
    const users = await User.find({}, 'email');

    const emails = users.map(user => user.email);

    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error fetching user emails:', error);
    res.status(500).json({ error: 'Failed to fetch user emails' });
  }
});

module.exports = router;