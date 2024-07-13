const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/stocks', companyController.getStocks);

module.exports = router;