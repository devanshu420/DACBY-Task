const express = require("express");
const authRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');


const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);



module.exports = app;