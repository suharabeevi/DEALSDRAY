const mongoose = require('mongoose')
const config= require('../utils/constants')
const connectDB = async () => {
    try {
        const dbOptions = {
            dbName: config.MONGO_DB_NAME,
        };
        await mongoose.connect(config.MONGO_DB_URI, dbOptions);
        console.log("Database connected...");
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
};

module.exports = connectDB;