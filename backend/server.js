const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");

const searchRouter = require("./routes/search");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "VIBERHOLIC API is running!",
  });
});

// Generate JWT
app.get("/api/token", (req, res) => {
  const token = jwt.sign(
    {
      role: "guest",
      app: "VIBERHOLIC",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    token,
  });
});

// Protected iTunes search route
app.use("/api/search", searchRouter);

// Serve React production build
const frontendPath = path.join(__dirname, "..", "frontend", "dist");

app.use(express.static(frontendPath));

// React fallback
app.get("*splat", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`VIBERHOLIC server running on port ${PORT}`);
});