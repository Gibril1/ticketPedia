"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/ErrorMiddleware');
require("colorts/lib/string");
// Init app
const app = express();
// Connect DB
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(errorHandler);
// routes
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/events', require('./routes/EventRoutes'));
app.use('/api/tickets', require('./routes/TicketRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`.red.underline);
});
