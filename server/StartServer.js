const connectDB = require('./config/DbConnection');
const config = require('./utils/constants');

const startServer = async (app) => {
  try {
    
    const port = config.PORT || 9000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    // Connect to the database
    await connectDB();
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

module.exports = startServer;
