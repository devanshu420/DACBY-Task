const express = require("express");
const authRoutes = require('./routes/user.routes');
const storyRoutes = require('./routes/story.routes');


// cookie parser
const cookieParser = require('cookie-parser');

// create express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);



module.exports = app;