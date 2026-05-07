const express = require("express");
const router = express.Router();

const { scrapeController } = require("../controllers/scraper.controller");

router.post("/", scrapeController);

module.exports = router;