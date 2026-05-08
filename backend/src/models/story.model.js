const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "unknown",
    },
    postedAt: {
      type: Date,
      required: true,
    },
    bookmarkedBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  default: []
}
  },
  { timestamps: true },
);


module.exports = mongoose.model("Story", storySchema);
