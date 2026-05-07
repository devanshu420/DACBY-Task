const axios = require("axios");
const cheerio = require("cheerio");

const fetchHTML = async (url) => {
  const { data } = await axios.get(url);
  // console.log(data);
  return cheerio.load(data);
};

module.exports = { fetchHTML };