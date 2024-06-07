const express = require('express');
const router = express.Router();
const TradesController = require('../controllers/trades');

// POST /trades
router.post('/', TradesController.createTrade);

// GET /trades
router.get('/', TradesController.getAllTrades);

// GET /trades/:id
router.get('/:id', TradesController.getTradeById);

// Handle DELETE, PUT, PATCH methods
const methodNotAllowed = (req, res) => res.status(405).send('Method not allowed');

router.delete('/:id', methodNotAllowed);
router.put('/:id', methodNotAllowed);
router.patch('/:id', methodNotAllowed);

module.exports = router;
