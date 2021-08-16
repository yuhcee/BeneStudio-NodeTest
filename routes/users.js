var express = require('express');
var router = express.Router();
var createUser = require('../controllers/users');

// Routes related to trades
router.post('/create', createUser)

module.exports = router;
