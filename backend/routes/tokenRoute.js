const express = require('express');
const router = express.Router();
const { buyToken } = require('../controllers/buyTokenController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createTransaction } = require('../controllers/transactionController');
const balanceController = require('../controllers/checkbalanceController');

router.post('/buy-token', authenticateToken, buyToken);
router.post('/transactions', authenticateToken, createTransaction);
router.get('/balance/bric', authenticateToken, balanceController.getBricTokenBalance);
router.get('/balance/xml', authenticateToken, balanceController.getXmlTokenBalance);

module.exports = router;