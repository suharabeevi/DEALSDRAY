const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const startServer = require('./StartServer');
const errorHandler = require('./utils/middlewares/ErrorHandling');

// Requiring routes
const AdminRoute = require('./routes/adminRouter');
const EmplyerRoute = require('./routes/EmployerRouter')

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Admin route
app.use('/api/v1/auth', AdminRoute);
app.use('/api/v2', EmplyerRoute);

// Global error handling middleware
app.use(errorHandler);

// Start server
startServer(app);
