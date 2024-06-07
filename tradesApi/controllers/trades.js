const TradesService = require('../services/tradesService');

class TradesController {
    static async createTrade(req, res) {
        try {
            const trade = await TradesService.createTrade(req.body);
            res.status(201).json(trade);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async getAllTrades(req, res) {
        try {
            const filter = {};
            if (req.query.type) filter.type = req.query.type;
            if (req.query.user_id) filter.user_id = req.query.user_id;

            const trades = await TradesService.getAllTrades(filter);
            res.status(200).json(trades);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getTradeById(req, res) {
        try {
            const trade = await TradesService.getTradeById(req.params.id);
            res.status(200).json(trade);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}

module.exports = TradesController;
