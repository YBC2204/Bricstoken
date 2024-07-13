const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/stocks', authenticateToken, stockController.getStocks);
router.post('/buy-stock',authenticateToken,  stockController.buyStock);

module.exports = router;