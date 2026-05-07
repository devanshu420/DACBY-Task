const express = require("express");
const {
  getStoriesController,
  getStoryByIdController,
  bookmarkStoryController,
} = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// get all stories
router.get("/", getStoriesController);

// get story by id
router.get("/:id", getStoryByIdController);

// bookmark story
router.post("/:id/bookmark", authMiddleware, bookmarkStoryController);

module.exports = router;
