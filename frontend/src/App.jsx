import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("music");
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Search for music, movies, podcasts, books and more."
  );

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const searchMedia = async (
    customSearchTerm = searchTerm,
    customMediaType = mediaType
  ) => {
    if (!customSearchTerm.trim()) {
      setMessage("Please enter something to search for.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const tokenResponse = await axios.get(
        "http://localhost:5000/api/token"
      );

      const token = tokenResponse.data.token;

      const response = await axios.get(
        "http://localhost:5000/api/search",
        {
          params: {
            term: customSearchTerm,
            media: customMediaType,
            limit: 24,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data.results);

      if (response.data.results.length === 0) {
        setMessage("No results found. Try another search.");
      }

      setRecentSearches((currentSearches) => {
        const newSearch = {
          term: customSearchTerm,
          media: customMediaType,
        };

        const filteredSearches = currentSearches.filter(
          (search) =>
            !(
              search.term.toLowerCase() ===
                customSearchTerm.toLowerCase() &&
              search.media === customMediaType
            )
        );

        return [newSearch, ...filteredSearches].slice(0, 6);
      });
    } catch (error) {
      console.error("Search error:", error);

      setMessage(
        "Something went wrong while searching. Please try again."
      );

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMedia();
    }
  };

  const surpriseMe = () => {
    const discoveries = [
      { term: "The Weeknd", media: "music" },
      { term: "SZA", media: "music" },
      { term: "Drake", media: "music" },
      { term: "Taylor Swift", media: "music" },
      { term: "Interstellar", media: "movie" },
      { term: "Harry Potter", media: "ebook" },
      { term: "The Beatles", media: "music" },
      { term: "Stranger Things", media: "tvShow" },
      { term: "Marvel", media: "movie" },
      { term: "Coldplay", media: "music" },
    ];

    const randomDiscovery =
      discoveries[Math.floor(Math.random() * discoveries.length)];

    setSearchTerm(randomDiscovery.term);
    setMediaType(randomDiscovery.media);

    searchMedia(
      randomDiscovery.term,
      randomDiscovery.media
    );
  };

  const discoverCategory = (category) => {
    const categorySearches = {
      music: {
        term: "popular music",
        media: "music",
      },
      movie: {
        term: "popular movies",
        media: "movie",
      },
      podcast: {
        term: "popular podcasts",
        media: "podcast",
      },
      ebook: {
        term: "popular books",
        media: "ebook",
      },
      software: {
        term: "popular apps",
        media: "software",
      },
    };

    const selectedCategory = categorySearches[category];

    setSearchTerm(selectedCategory.term);
    setMediaType(selectedCategory.media);

    searchMedia(
      selectedCategory.term,
      selectedCategory.media
    );
  };

  const repeatSearch = (search) => {
    setSearchTerm(search.term);
    setMediaType(search.media);

    searchMedia(search.term, search.media);
  };

  const getMediaLabel = (media) => {
    const labels = {
      music: "Music",
      movie: "Movies",
      podcast: "Podcasts",
      audiobook: "Audiobooks",
      shortFilm: "Short Films",
      tvShow: "TV Shows",
      software: "Apps",
      ebook: "Books",
      all: "Everything",
    };

    return labels[media] || media;
  };

  const getItemId = (item) => {
    return (
      item.trackId ||
      item.collectionId ||
      item.collectionName ||
      item.trackName
    );
  };

  const isFavourite = (item) => {
    const itemId = getItemId(item);

    return favourites.some(
      (favourite) => getItemId(favourite) === itemId
    );
  };

  const toggleFavourite = (item) => {
    const itemId = getItemId(item);

    if (isFavourite(item)) {
      setFavourites((currentFavourites) =>
        currentFavourites.filter(
          (favourite) => getItemId(favourite) !== itemId
        )
      );
    } else {
      setFavourites((currentFavourites) => [
        ...currentFavourites,
        item,
      ]);
    }
  };

  const playTrack = (item) => {
    if (!item.previewUrl) {
      setMessage(
        "This track does not have a preview available."
      );
      return;
    }

    setCurrentTrack(item);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const watchMovieTrailer = (item) => {
    const movieTitle =
      item.trackName ||
      item.collectionName ||
      item.trackCensoredName ||
      "movie";

    const trailerSearch = encodeURIComponent(
      `${movieTitle} official trailer`
    );

    window.open(
      `https://www.youtube.com/results?search_query=${trailerSearch}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, isPlaying]);

  const renderMediaCard = (item, index) => {
    const favourite = isFavourite(item);

    const isMovie = mediaType === "movie";

    const isMusic =
      mediaType === "music" && Boolean(item.previewUrl);

    return (
      <div
        className="col-12 col-sm-6 col-lg-4 col-xl-3"
        key={getItemId(item) || index}
      >
        <div className="card h-100 shadow-sm border-0">
          {item.artworkUrl100 && (
            <img
              src={item.artworkUrl100}
              className="card-img-top"
              alt={
                item.collectionName ||
                item.trackName ||
                item.artistName ||
                "VIBERHOLIC result"
              }
            />
          )}

          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold">
              {item.trackName ||
                item.collectionName ||
                item.trackCensoredName ||
                "Untitled"}
            </h5>

            <p className="card-text text-muted mb-2">
              {item.artistName ||
                item.collectionArtistName ||
                ""}
            </p>

            {item.collectionName && (
              <p className="small text-secondary mb-2">
                Album: {item.collectionName}
              </p>
            )}

            {item.releaseDate && (
              <p className="small text-secondary">
                Released:{" "}
                {new Date(
                  item.releaseDate
                ).toLocaleDateString()}
              </p>
            )}

            <div className="mt-auto pt-3">
              {isMovie && (
                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={() =>
                    watchMovieTrailer(item)
                  }
                >
                  ▶ Watch Trailer
                </button>
              )}

              {isMusic && (
                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={() => playTrack(item)}
                >
                  🎵 Play Preview
                </button>
              )}

              <button
                className={`btn ${
                  favourite
                    ? "btn-danger"
                    : "btn-outline-danger"
                } w-100 mb-2`}
                onClick={() =>
                  toggleFavourite(item)
                }
              >
                {favourite
                  ? "♥ In My Vault"
                  : "♡ Add to My Vault"}
              </button>

              {/* Apple link is hidden for movies */}
              {item.trackViewUrl && !isMovie && (
                <a
                  href={item.trackViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark w-100"
                >
                  View on Apple
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark bg-dark px-4 py-3">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-3">
            VIBERHOLIC
          </span>

          <div className="d-flex align-items-center gap-3">
            <span className="text-light small d-none d-md-block">
              Find your next obsession.
            </span>

            <span className="badge bg-danger fs-6">
              ♥ {favourites.length}
            </span>
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <section className="text-center mb-5">
          <h1 className="display-4 fw-bold">
            Discover Your Next Vibe
          </h1>

          <p className="lead text-muted">
            Explore music, movies, podcasts, books and more.
          </p>

          <div className="row justify-content-center mt-4">
            <div className="col-12 col-lg-8">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for an artist, movie, book..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

                <select
                  className="form-select"
                  value={mediaType}
                  onChange={(event) =>
                    setMediaType(event.target.value)
                  }
                  style={{ maxWidth: "180px" }}
                >
                  <option value="music">Music</option>
                  <option value="movie">Movies</option>
                  <option value="podcast">Podcasts</option>
                  <option value="audiobook">Audiobooks</option>
                  <option value="shortFilm">Short Films</option>
                  <option value="tvShow">TV Shows</option>
                  <option value="software">Software</option>
                  <option value="ebook">eBooks</option>
                  <option value="all">All</option>
                </select>

                <button
                  className="btn btn-dark px-4"
                  onClick={() => searchMedia()}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>

              <button
                className="btn btn-outline-light mt-3 px-4 py-2"
                onClick={surpriseMe}
                disabled={loading}
              >
                ✨{" "}
                {loading
                  ? "Discovering..."
                  : "Surprise Me"}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">
              Explore Your Vibe
            </h2>

            <p className="text-muted">
              Choose a category and let VIBERHOLIC do
              the discovering.
            </p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-4 col-lg">
              <button
                className="btn btn-outline-light w-100 py-3"
                onClick={() =>
                  discoverCategory("music")
                }
                disabled={loading}
              >
                🎵
                <br />
                <strong>Music</strong>
              </button>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <button
                className="btn btn-outline-light w-100 py-3"
                onClick={() =>
                  discoverCategory("movie")
                }
                disabled={loading}
              >
                🎬
                <br />
                <strong>Movies</strong>
              </button>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <button
                className="btn btn-outline-light w-100 py-3"
                onClick={() =>
                  discoverCategory("podcast")
                }
                disabled={loading}
              >
                🎙️
                <br />
                <strong>Podcasts</strong>
              </button>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <button
                className="btn btn-outline-light w-100 py-3"
                onClick={() =>
                  discoverCategory("ebook")
                }
                disabled={loading}
              >
                📚
                <br />
                <strong>Books</strong>
              </button>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <button
                className="btn btn-outline-light w-100 py-3"
                onClick={() =>
                  discoverCategory("software")
                }
                disabled={loading}
              >
                💻
                <br />
                <strong>Apps</strong>
              </button>
            </div>
          </div>
        </section>

        {message && (
          <div className="text-center text-muted mb-4">
            <p>{message}</p>
          </div>
        )}

        {recentSearches.length > 0 && (
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="fw-bold mb-1">
                  🕘 Recently Discovered
                </h2>

                <p className="text-muted mb-0">
                  Jump back into something you explored.
                </p>
              </div>

              <span className="badge bg-dark">
                {recentSearches.length} recent
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {recentSearches.map(
                (search, index) => (
                  <button
                    key={`${search.term}-${search.media}-${index}`}
                    className="btn btn-outline-light"
                    onClick={() =>
                      repeatSearch(search)
                    }
                    disabled={loading}
                  >
                    {search.term}

                    <span className="ms-2 text-secondary">
                      •{" "}
                      {getMediaLabel(
                        search.media
                      )}
                    </span>
                  </button>
                )
              )}
            </div>
          </section>
        )}

        {results.length > 0 && (
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">
                Discoveries
              </h2>

              <span className="badge bg-dark">
                {results.length} results
              </span>
            </div>

            <div className="row g-4">
              {results.map(renderMediaCard)}
            </div>
          </section>
        )}

        {favourites.length > 0 && (
          <section className="mt-5 pt-5 border-top">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">
                  ♥ My Vault
                </h2>

                <p className="text-muted mb-0">
                  Your personal collection of
                  discoveries.
                </p>
              </div>

              <span className="badge bg-danger fs-6">
                {favourites.length} saved
              </span>
            </div>

            <div className="row g-4">
              {favourites.map((item, index) =>
                renderMediaCard(item, index)
              )}
            </div>
          </section>
        )}
      </main>

      {currentTrack && (
        <div className="fixed-bottom bg-dark text-white shadow-lg border-top">
          <div className="container py-3">
            <div className="row align-items-center g-3">
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center">
                  {currentTrack.artworkUrl100 && (
                    <img
                      src={currentTrack.artworkUrl100}
                      alt="Album artwork"
                      width="60"
                      height="60"
                      className="rounded me-3"
                    />
                  )}

                  <div>
                    <div className="fw-bold">
                      {currentTrack.trackName ||
                        currentTrack.collectionName ||
                        "Unknown Track"}
                    </div>

                    <small className="text-light">
                      {currentTrack.artistName ||
                        "Unknown Artist"}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 text-center">
                <button
                  className="btn btn-light rounded-circle px-3 py-2"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <div className="small text-secondary mt-2">
                  Preview playback
                </div>
              </div>

              <div className="col-12 col-md-4">
                <audio
                  ref={audioRef}
                  controls
                  className="w-100"
                  src={currentTrack.previewUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  Your browser does not support audio
                  playback.
                </audio>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer
        className={`bg-dark text-light text-center py-4 ${
          currentTrack ? "mb-5" : ""
        }`}
      >
        <p className="mb-1 fw-bold">
          VIBERHOLIC
        </p>

        <small>
          Discover. Listen. Explore.
        </small>

        <div className="mt-2">
          <small className="text-secondary">
            © 2026 Mzimasi Bulani
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;