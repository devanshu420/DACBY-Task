const Story = require("../models/story.model");

const saveStories = async (stories) => {
  if (!stories.length) return [];

  await Story.deleteMany({});
  await Story.insertMany(stories);

  return stories;
};

module.exports = { saveStories };