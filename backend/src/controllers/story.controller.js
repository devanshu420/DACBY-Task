const mongoose = require("mongoose");
const Story = require("../models/story.model");

// get all stories controller
const getStoriesController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .sort({ points: -1, postedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Story.countDocuments();

    res.json({
      stories,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get story by id controller
const getStoryByIdController = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid story ID" });
    }

    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch story",
      error: error.message,
    });
  }
};

// bookmark story controller
const bookmarkStoryController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: "Invalid story ID" });
    }

    // auth check
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (!Array.isArray(story.bookmarkedBy)) {
      story.bookmarkedBy = [];
    }

    const alreadyBookmarked = story.bookmarkedBy.some((id) =>
      id.equals(userId),
    );

    if (alreadyBookmarked) {
      // remove bookmark
      story.bookmarkedBy = story.bookmarkedBy.filter(
        (id) => !id.equals(userId),
      );
    } else {
      // add bookmark
      story.bookmarkedBy.push(userId);
    }

    await story.save();

    return res.json({
      message: alreadyBookmarked ? "Bookmark removed" : "Bookmark added",
      bookmarked: !alreadyBookmarked,
      story,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to toggle bookmark",
      error: error.message,
    });
  }
};

// get my bookmarks controller
const getMyBookmarksController = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const stories = await Story.find({
      bookmarkedBy: userId,
    }).sort({ createdAt: -1 });

    return res.json({
      stories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch bookmarks",
      error: error.message,
    });
  }
};

module.exports = {
  getStoriesController,
  getStoryByIdController,
  bookmarkStoryController,
  getMyBookmarksController,
};
