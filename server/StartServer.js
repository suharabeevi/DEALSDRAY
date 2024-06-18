const express = require('express');
const app = express();
const connectDB = require('./config/DbConnection')

const startServer = async () => {
  try {
    connectDB()
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

module.exports = startServer;
