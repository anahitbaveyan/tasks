const Trade = require('../models/trades');

class TradesService {
    static async createTrade(tradeData) {
        const { type, user_id, symbol, shares, price, timestamp } = tradeData;

        if (!['buy', 'sell'].includes(type)) {
            throw new Error('Invalid trade type');
        }

        if (shares < 1 || shares > 100) {
            throw new Error('Shares out of range');
        }

        const highestTrade = await Trade.findOne().sort({ id: -1 });
        const newId = highestTrade ? highestTrade.id + 1 : 1;

        const newTrade = new Trade({ id: newId, type, user_id, symbol, shares, price, timestamp });
        await newTrade.save();

        return TradesService.cleanTradeObject(newTrade);
    }

    static async getAllTrades(filter) {
        const trades = await Trade.find(filter).sort({ id: 1 });
        return trades.map(trade => TradesService.cleanTradeObject(trade));
    }

    static async getTradeById(id) {
        const trade = await Trade.findOne({ id: parseInt(id) });
        if (!trade) {
            throw new Error('ID not found');
        }
        return TradesService.cleanTradeObject(trade);
    }

    static cleanTradeObject(trade) {
        const cleanedTrade = trade.toObject();
        delete cleanedTrade._id;
        delete cleanedTrade.__v;
        return cleanedTrade;
    }
}

module.exports = TradesService;
