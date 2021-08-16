var express = require('express');
const TradeController = require('../controllers/trades');
var router = express.Router();

// Routes related to stocks
router.get('/:stockSymbol/trades', TradeController.filterTradesByStockSymbol);
router.get('/:stockSymbol/price', TradeController.filterPriceByStockSymbol);


module.exports = router;