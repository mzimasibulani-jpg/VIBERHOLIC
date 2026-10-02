const express = require("express");
const axios = require("axios");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { term, media = "all", limit = 24 } = req.query;

    if (!term) {
      return res.status(400).json({
        message: "Search term is required.",
      });
    }

    const response = await axios.get("https://itunes.apple.com/search", {
      params: {
        term,
        media,
        limit,
      },
    });

    res.json({
      results: response.data.results,
      resultCount: response.data.resultCount,
    });
  } catch (error) {
    console.error("iTunes API error:", error.message);

    res.status(500).json({
      message: "Unable to fetch results from the iTunes Search API.",
    });
  }
});

module.exports = router;