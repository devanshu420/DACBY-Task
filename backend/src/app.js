const express = require("express");
const authRoutes = require('./routes/user.routes');
const storyRoutes = require('./routes/story.routes');
const scraperRoutes = require("./routes/scraper.routes");

const cors = require("cors");



// cookie parser
const cookieParser = require('cookie-parser');

// create express app
const app = express();

// Cors


app.use(
  cors({
    origin: ["http://localhost:5173"], 
    credentials: true, 
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use("/api/scrape", scraperRoutes);



module.exports = app;