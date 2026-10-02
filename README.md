# VIBERHOLIC

> **Find your next obsession.**

VIBERHOLIC is a full-stack media discovery application built with React and Express. It connects to the iTunes Search API to help users discover music, movies, podcasts, audiobooks, TV shows, ebooks, software and other media in one modern interface.

The application combines media discovery, favourites, recent searches and interactive previews in a responsive, dark-themed experience.

---

## Project Purpose

The purpose of VIBERHOLIC is to demonstrate full-stack web development skills by building a React frontend that communicates with a secure Express backend and an external API.

The project demonstrates:

- React component development
- Express REST API development
- API integration
- Axios HTTP requests
- JWT-based API authorisation
- Responsive UI design
- State management with React hooks
- Search and filtering
- Favourites management
- Media previews
- Error and loading-state handling
- Git version control

---

## Key Features

### 🔎 Media Discovery

Search for media using the iTunes Search API.

Supported media categories include:

- Music
- Movies
- Podcasts
- Audiobooks
- Short Films
- TV Shows
- Software
- Ebooks
- All media

---

### 🎵 Music Preview

Music results that provide an iTunes preview URL can be played directly from the application.

VIBERHOLIC includes a dedicated media player that allows users to listen to available previews without leaving the application.

---

### 🎬 Movie Trailer Discovery

Movie results include a **Watch Trailer** option.

Selecting the option opens a YouTube search for the movie's official trailer, providing an easy way to continue exploring the title.

---

### ❤️ My Vault

Users can save media they are interested in to their personal **My Vault** collection.

Users can:

- Add favourites
- Remove favourites
- View saved media
- Open saved items through their available Apple/iTunes links

Favourites are stored in the application's frontend state and are not persisted after the application session ends.

---

### ✨ Surprise Me

The **Surprise Me** feature allows users to discover something without manually entering a search term.

This provides a quick way to explore different media and makes the application more discovery-focused.

---

### 🎯 Vibe Discovery

VIBERHOLIC includes curated discovery categories designed to make searching more engaging.

Users can quickly explore different media themes without having to manually construct a search query.

---

### 🕘 Recently Discovered

Recent searches are displayed so users can quickly return to previously explored searches during their current session.

---

### 🔐 JWT API Protection

The Express backend uses JSON Web Tokens to protect API requests.

The frontend first requests a temporary JWT from the backend before making protected search requests.

The backend validates the token before allowing access to the iTunes search route.

No user account or registration system is required.

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- Bootstrap
- CSS

### Backend

- Node.js
- Express
- Axios
- JSON Web Token (JWT)
- CORS
- dotenv

### External API

- Apple iTunes Search API

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

---

## Project Architecture

```text
VIBEVAULT/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   └── search.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md