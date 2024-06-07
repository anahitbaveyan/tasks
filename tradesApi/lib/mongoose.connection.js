const mongoose = require('mongoose');
const ConnectionBase = require('./connection-base');
const Trades = require('../models/trades');
mongoose.Promise = Promise;

// Replace 'yourUrl' with your actual MongoDB connection string before deploying to production
const mongoUri = 'yourUrl';

const connect = () => {
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    return mongoose.connect(mongoUri, mongooseOpts)
        .then((connection) => {
            console.log(`MongoDB successfully connected to ${mongoUri}`);
            return connection;
        })
        .catch((error) => {
            console.error(`MongoDB connection error: ${error}`);
            throw error;
        });
}

class MongooseConnection extends ConnectionBase {

    getConnection() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = connect()
            .then(connection => {
                this.connection = connection;
                return connection;
            });
        return this.promise;
    }

    async clearDatabase() {
        return Trades.deleteMany();
    }

    async closeConnection() {
        return this.connection.connection.close();
    }
}

module.exports = MongooseConnection;