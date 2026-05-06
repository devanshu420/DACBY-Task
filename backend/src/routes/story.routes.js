const express = require("express");
const { getStoriesController, getStoryByIdController } = require("../controllers/story.controller");

const router = express.Router();

// get all stories
router.get("/", getStoriesController);

// get story by id
router.get("/:id", getStoryByIdController);

module.exports = router;
