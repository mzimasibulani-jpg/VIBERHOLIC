# VIBERHOLIC

> **Find your next obsession.**

VIBERHOLIC is a full-stack media discovery application built with React and Express. It connects to the Apple iTunes Search API to help users discover music, movies, podcasts, audiobooks, TV shows, ebooks, software and other media through one modern interface.

The application combines media discovery, favourites, recent searches and interactive previews in a responsive interface.

---

## Project Purpose

The purpose of VIBERHOLIC is to demonstrate full-stack web development skills by building a React frontend that communicates with an Express backend and an external API.

The project demonstrates:

* React component development
* Express REST API development
* API integration
* Axios HTTP requests
* JWT-based API authorisation
* Responsive UI design
* React state management
* Search and media filtering
* Favourites management
* Media previews
* Error and loading-state handling
* Git and GitHub version control

---

## Key Features

### 🔎 Media Discovery

Users can search the iTunes Search API using a search term and select a media category.

Supported media categories include:

* Music
* Movies
* Podcasts
* Audiobooks
* Short Films
* TV Shows
* Software
* eBooks
* All media

---

### 🎵 Music Preview

Music results that provide an iTunes preview URL can be played directly within the application.

VIBERHOLIC includes a media player for available music previews.

---

### 🎬 Movie Trailer Discovery

Movie results include a **Watch Trailer** option.

Selecting this option opens a YouTube search for the movie's official trailer.

---

### ❤️ My Vault

Users can save media to their personal **My Vault** collection.

Users can:

* Add favourites
* Remove favourites
* View saved media
* Open available Apple/iTunes links

Favourites are stored in the frontend application state and are not persisted after the application session ends.

---

### ✨ Surprise Me

The **Surprise Me** feature allows users to discover something without manually entering a search term.

This provides a quick way to explore different media.

---

### 🎯 Vibe Discovery

VIBERHOLIC provides curated discovery categories that allow users to quickly explore different types of media without manually entering a search query.

---

### 🕘 Recently Discovered

Recent searches are displayed during the current application session so users can quickly return to previously explored searches.

---

### 🔐 JWT API Protection

The Express backend uses JSON Web Tokens to protect API requests.

The frontend first requests a temporary JWT from the backend and then includes the token when making protected search requests.

The backend validates the JWT before allowing access to the protected iTunes Search API route.

No user registration or login system is required for this project.

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* Bootstrap 5
* CSS

### Backend

* Node.js
* Express
* Axios
* JSON Web Token (JWT)
* CORS
* dotenv

### External API

* Apple iTunes Search API

### Development Tools

* Git
* GitHub
* Visual Studio Code
* npm

---

## Project Architecture

```text
VIBERHOLIC/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   └── search.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## How the Application Works

The application uses a React frontend and an Express backend.

```text
User
  ↓
React Frontend
  ↓
Express Backend
  ↓
JWT Authorisation
  ↓
iTunes Search API
  ↓
Express Backend
  ↓
React Frontend
  ↓
Search Results
```

The frontend communicates with the Express backend through protected API routes.

The Express backend communicates with the Apple iTunes Search API and returns the required media information to the frontend.

---

## Required iTunes Media Information

For music searches, the application displays available information including:

* Album name
* Artist name
* Album artwork
* Release date

Additional information and functionality are displayed where the iTunes API makes the data available.

---

## Installation and Running Locally

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/mzimasibulani-jpg/VIBERHOLIC.git
```

Then enter the project directory:

```bash
cd VIBERHOLIC
```

### 2. Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` folder.

Add the required backend secret values used by the application.

The `.env` file should not be committed to GitHub because it contains private configuration values.

### 4. Start the Backend

From the `backend` folder:

```bash
npm start
```

For development with automatic server restarting:

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open a second terminal.

From the project root:

```bash
cd frontend
npm install
```

### 6. Start the React Frontend

Run:

```bash
npm run dev
```

Vite will provide a local development address, normally:

```text
http://localhost:5173
```

Open the address shown by Vite in your web browser.

---

## Production Build

To create a production build of the React frontend:

```bash
cd frontend
npm run build
```

The production files are generated in the `dist` directory.

---

## Code Quality

The frontend includes ESLint configuration.

To run the frontend linting process:

```bash
cd frontend
npm run lint
```

The project follows consistent JavaScript practices, meaningful variable and component names, and a clear separation between frontend and backend responsibilities.

---

## Data and Privacy

VIBERHOLIC does not require:

* User registration
* User login
* A database
* Permanent storage of favourites
* Permanent storage of search history

Favourites and recent searches are maintained during the current application session and are not stored after the user leaves the application.

---

## Author

**Mzimasi Bulani**

GitHub Repository:

https://github.com/mzimasibulani-jpg/VIBERHOLIC

---

## Project Notes

This project was created as a HyperionDev Full Stack Software Development Capstone Project.

The application demonstrates the integration of:

* React
* Express
* Node.js
* JWT
* Axios
* Bootstrap
* iTunes Search API
* GitHub
