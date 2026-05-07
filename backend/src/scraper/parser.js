const { parsePostedTime } = require("../utils/timeParser");

const parseStories = ($) => {
  const stories = [];

  $(".athing").slice(0, 10).each((_, el) => {
    const row = $(el);
    const subtextRow = row.next();

    const titleAnchor = row.find(".titleline a").first();

    const title = titleAnchor.text().trim();
    const url = titleAnchor.attr("href") || "";

    const points =
      Number(subtextRow.find(".score").text().replace(/[^\d]/g, "")) || 0;

    const author = subtextRow.find(".hnuser").text().trim() || "unknown";

    const postedAt = parsePostedTime(
      subtextRow.find(".age").text().trim()
    );

    if (title) {
      stories.push({
        title,
        url,
        points,
        author,
        postedAt
      });
    }
  });

  return stories;
};

module.exports = { parseStories };