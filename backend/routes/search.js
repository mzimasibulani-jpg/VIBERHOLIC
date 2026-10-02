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

    let params = {
      term,
      limit: media === "movie" ? 200 : limit,
    };

    // Apple currently has unreliable results when using
    // media=movie directly, so movie searches use the
    // general search endpoint and filter movie results below.
    if (media !== "movie") {
      params.media = media;
    }

    const response = await axios.get(
      "https://itunes.apple.com/search",
      {
        params,
      }
    );

    let results = response.data.results;

    // Filter general iTunes results to actual movies.
    if (media === "movie") {
      results = results.filter(
        (item) =>
          item.kind === "feature-movie" ||
          item.wrapperType === "track" &&
            item.trackName &&
            item.primaryGenreName &&
            item.longDescription
      );

      results = results.slice(0, Number(limit));
    }

    res.json({
      results,
      resultCount: results.length,
    });
  } catch (error) {
    console.error("iTunes API error:", error.message);

    res.status(500).json({
      message: "Unable to fetch results from the iTunes Search API.",
    });
  }
});

module.exports = router;