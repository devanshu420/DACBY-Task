require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const { scrapeHackerNews } = require("./src/scraper");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await scrapeHackerNews();
  console.log(`Server is running on port ${PORT}`);
});