const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const searchRouter = require("./routes/search");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home/test route
app.get("/", (req, res) => {
  res.json({
    message: "VIBERHOLIC API is running!",
  });
});

// Generate a guest JWT token
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

// Start the server
app.listen(PORT, () => {
  console.log(`VIBERHOLIC server running on port ${PORT}`);
});