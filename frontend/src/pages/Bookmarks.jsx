import { useEffect, useState } from "react";
import { BookmarkCheck, ExternalLink } from "lucide-react";
import api from "../services/axios";

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch bookmarked stories
  const fetchBookmarks = async () => {
    try {
      const res = await api.get(`/stories/bookmarks/me`);

      setStories(res.data.stories);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // remove bookmark
  const removeBookmark = async (id) => {
    try {
      await api.post(`/stories/${id}/bookmark`);

      setStories((prev) => prev.filter((story) => story._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-gray-500">Loading bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>

        <p className="text-gray-500 text-sm mt-1">
          Your saved Hacker News stories
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="border rounded-xl p-8 text-center bg-white shadow-sm">
          <p className="text-gray-500">No bookmarked stories found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story, index) => (
            <div
              key={story._id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex justify-between items-start gap-4">
                {/* LEFT */}
                <div className="flex-1">
                  <span className="text-sm text-gray-400 mr-2">
                    {index + 1}.
                  </span>

                  <a
                    href={story.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    {story.title}

                    <ExternalLink size={16} />
                  </a>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
                    <span>🔥 {story.points} points</span>

                    <span>👤 {story.author}</span>

                    <span>🕒 {new Date(story.postedAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* bookmark button */}
                <button
                  onClick={() => removeBookmark(story._id)}
                  className="hover:scale-110 transition"
                  title="Remove Bookmark"
                >
                  <BookmarkCheck className="text-yellow-500 size-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
