import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

    const fetchUser = async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <h2 className="text-xl font-bold tracking-wide">Web Scraper</h2>

      {/* Links */}
      <div className="flex items-center gap-5 text-sm">
        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>

        {user && (
          <Link to="/bookmarks" className="hover:text-blue-400 transition">
            Bookmarks
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-400 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-400 transition">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
