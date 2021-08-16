var express = require('express');
var router = express.Router();
const TradeController = require('../controllers/trades');

// Route to delete all trades
router.delete('/', TradeController.deleteAllTrades);

module.exports = router;
