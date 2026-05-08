# Web Scraper

A full stack MERN application that scrapes stories from Hacker News and allows users to view, authenticate, and bookmark their favorite stories.

---

# Features

| Feature | Description |
|----------|-------------|
| User Authentication | Register and login system |
| JWT Cookie Auth | Secure authentication using httpOnly cookies |
| Story Listing | Paginated stories from Hacker News |
| Bookmark System | Save and remove bookmarks |
| Session Persistence | Auto login using /auth/me |
| Protected Routes | Only logged-in users can access certain features |
| Global State | React Context for auth management |

---

# Tech Stack

| Frontend | Backend |
|----------|---------|
| React | Node.js |
| React Router DOM | Express.js |
| Axios | MongoDB |
| Context API | Mongoose |
| Tailwind CSS | JWT Authentication |
|  | Cookie Parser |
|  | CORS |

---

# Project Structure
backend/
│
├── src/
│ ├── controllers/
│ ├── db/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── scraper/
│ ├── utils/
│ └── app.js
│
├── server.js
├── package.json
└── .env

frontend/
│
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ └── main.jsx
│
├── package.json
└── .env

---

# Backend Setup

## Install dependencies

cd backend
npm install


## Environment Variables (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---
## Start backend server

npm run dev


Backend runs at:

http://localhost:5000


---

# Frontend Setup

## Install dependencies

cd frontend
npm install


## Environment Variables (.env)

VITE_BASE_URL=http://localhost:5000/api


## Start frontend

npm run dev


Frontend runs at:

http://localhost:5173


---

# Authentication Flow

| Step | Flow |
|------|------|
| 1 | User logs in or registers |
| 2 | Backend sends JWT in httpOnly cookie |
| 3 | Frontend uses withCredentials: true |
| 4 | /auth/me validates session |
| 5 | User state stored in React Context |

---

# Bookmark Feature

| Action | Result |
|--------|--------|
| Bookmark story | Adds user ID to bookmarkedBy |
| Remove bookmark | Removes user ID from bookmarkedBy |
| UI Update | Immediate state update after API response |
| Requirement | User must be authenticated |

---

# Author

Devanshu Sharma