require("dotenv").config();

const Configs = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.DB_URL,
  MONGO_DB_NAME:process.env.DB_NAME,
  JWT_SECRET:process.env.JWT_SECRET,
  CLOUD_NAME:process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
};

module.exports = Configs;