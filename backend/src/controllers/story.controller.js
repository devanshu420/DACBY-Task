const mongoose = require("mongoose");
const Story = require("../models/story.model");


// get all stories
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
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get story by id
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

module.exports = { getStoriesController, getStoryByIdController };
