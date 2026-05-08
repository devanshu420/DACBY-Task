import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);

  // fetch logged-in user
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
      navigate("/login"); 
    }
  };

  // fetch stories
  const fetchStories = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/stories?page=${page}&limit=10&ts=${Date.now()}`,
      );

      setStories(res.data.stories);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchStories();
  }, [page]);

  // toggle bookmark
  const toggleBookmark = async (id) => {
    try {
      const res = await api.post(`/stories/${id}/bookmark`);

      setStories((prev) =>
        prev.map((story) =>
          story._id === id
            ? {
                ...story,
                bookmarkedBy: res.data.story.bookmarkedBy,
              }
            : story,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-gray-500">Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hacker News Stories</h1>

        {user ? (
          <p className="text-sm text-green-600 mt-1">
            Welcome back, {user.name}
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-1">
            Login to bookmark stories
          </p>
        )}
      </div>

      {/* stories */}
      <div className="space-y-4">
        {stories.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-gray-500">No stories found</p>
          </div>
        ) : (
          stories.map((story, index) => {
            const isBookmarked = story.bookmarkedBy?.includes(user?.id);

            return (
              <div
                key={story._id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex justify-between items-start gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    {/* ranking */}
                    <span className="text-sm text-gray-400 mr-2">
                      {index + 1 + (page - 1) * 10}.
                    </span>

                    {/* title */}
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      {story.title}

                      <ExternalLink size={16} />
                    </a>

                    {/* meta info */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
                      <span>🔥 {story.points} points</span>

                      <span>👤 {story.author}</span>

                      <span>
                        🕒 {new Date(story.postedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  {user && (
                    <button
                      onClick={() => toggleBookmark(story._id)}
                      className="hover:scale-110 transition"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="text-yellow-500 size-6" />
                      ) : (
                        <Bookmark className="text-gray-400 size-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>

        <span className="font-medium">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
