const { fetchHTML } = require("./fetcher");
const { parseStories } = require("./parser");
const { saveStories } = require("./mapper");

const scrapeHackerNews = async () => {
  const $ = await fetchHTML("https://news.ycombinator.com");
  const stories = parseStories($);
  return await saveStories(stories);
};

module.exports = { scrapeHackerNews };