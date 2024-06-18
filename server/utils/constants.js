require("dotenv").config();

const Configs = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.DB_URL,
  MONGO_DB_NAME:process.env.DB_NAME,
  JWT_SECRET:process.env.JWT_SECRET
};

module.exports = Configs;