var express = require('express');
const  TradeController = require('../controllers/trades');
var router = express.Router();

// Routes related to trades
router.post('/', TradeController.addTrade);
router.get('/', TradeController.getAllTrades);
router.get('/users/:userId', TradeController.filterTradesByUserId)

module.exports = router;