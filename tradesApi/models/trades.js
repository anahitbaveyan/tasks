const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['buy', 'sell']
    },
    user_id: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

tradeSchema.statics.findByUserId = function(userId) {
    return this.find({ user_id: userId });
};

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
