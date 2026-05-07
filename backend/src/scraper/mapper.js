const Story = require("../models/story.model");

const saveStories = async (stories) => {
  if (!stories.length) return [];

  const results = await Promise.all(
    stories.map(async (story) => {
      return await Story.findOneAndUpdate(
        { url: story.url },
        {
          title: story.title,
          url: story.url,
          points: story.points,
          author: story.author,
          postedAt: story.postedAt,
        },
        {
          upsert: true,
          new: true,
        }
      );
    })
  );

  return results;
};

module.exports = { saveStories };