# Web Scraper 

A full stack MERN application that scrapes stories from Hacker News and allows users to view, authenticate, and bookmark their favorite stories.

---

# Features

- User registration and login
- Cookie based authentication using JWT
- View paginated stories
- Bookmark and unbookmark stories
- Persistent login using /auth/me
- Protected routes for authenticated users
- Global auth state using React Context

---

# Tech Stack

Frontend:
- React
- React Router DOM
- Axios
- Context API
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS

---

# Project Setup

# Backend Setup

## Install dependencies
cd backend
npm install

## Create .env file
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

## Start backend server
npm run dev

Backend runs on:
http://localhost:5000

---

# Frontend Setup

## Install dependencies
cd frontend
npm install

## Create .env file
VITE_BASE_URL=http://localhost:5000/api

## Start frontend
npm run dev

Frontend runs on:
http://localhost:5173

---

# Authentication Flow

- User logs in or registers
- Backend sends JWT in httpOnly cookie
- Frontend sends requests with withCredentials: true
- /auth/me verifies user session
- Auth state stored in React Context

---

# Bookmark Feature

- Users can bookmark or remove bookmarks
- Stored in MongoDB in bookmarkedBy array
- UI updates instantly after API response
- Requires authentication

---

# Folder Structure

backend/
  src/
    controllers/
    db/
    middlewares/
    models/
    routes/
    scraper/
    utils/
    app.js
  server.js

frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
    main.jsx

---

# Future Improvements

- Search functionality
- Infinite scroll
- User dashboard
- Categories and filtering
- Dark mode

---

# Author

Devanshu Sharma