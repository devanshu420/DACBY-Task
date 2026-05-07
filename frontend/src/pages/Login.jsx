import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      await axios.post(`${BASE_URL}/auth/login`, form, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-80 p-6 bg-white shadow-sm rounded">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded text-sm"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <p className="text-xs text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
