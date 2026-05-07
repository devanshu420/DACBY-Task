const { scrapeHackerNews } = require("../scraper");

const scrapeController = async (req, res) => {
  try {
    const data = await scrapeHackerNews();

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { scrapeController };