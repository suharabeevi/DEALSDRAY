const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors= require('cors')
require('dotenv').config();
const startServer = require('./StartServer');

//middleware

app.use(bodyParser.json());
app.use(express.json())
app.use(cors({origin:"*"}))
app.use(morgan("dev"))


startServer(app);
