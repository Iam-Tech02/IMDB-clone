import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop250Movies } from "../redux/src/ features/top250Movies/top250MoviesSlice";

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const TrailerCarousel = () => {
  const dispatch = useDispatch();
  const { moviesList, status, error } = useSelector(
    (state) => state.top250Movies
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailerError, setTrailerError] = useState(false);

  useEffect(() => {
    dispatch(fetchTop250Movies());
  }, [dispatch]);

  const handleNext = () => {
    setIsPlaying(false);
    setTrailerError(false);
    setCurrentIndex((prev) => (prev + 1) % moviesList.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setTrailerError(false);
    setCurrentIndex((prev) => (prev - 1 + moviesList.length) % moviesList.length);
  };

  const getUpNextMovies = () => {
    if (!moviesList || moviesList.length === 0) return [];
    
    return Array.from({ length: 5 }, (_, i) => {
      const nextIndex = (currentIndex + i + 1) % moviesList.length;
      return moviesList[nextIndex];
    });
  };

  const handleTrailerError = () => {
    setTrailerError(true);
  };

  if (status === "loading") return <div className="text-white text-center py-5">Loading...</div>;
  if (status === "failed") return <div className="text-white text-center py-5">Error: {error}</div>;
  if (!moviesList?.length) return <div className="text-white text-center py-5">No movies available</div>;

  const currentMovie = moviesList[currentIndex];
  const currentVideoId = getYouTubeId(currentMovie?.trailer?.url || currentMovie?.trailer);

  return (
    <div className="container mt-4 text-white">
      <div className="row" style={{ minHeight: "600px" }}>
        <div className="col-md-8 position-relative">
          <div
            className="h-100 w-100 rounded position-relative"
            style={{
              backgroundColor: "#000",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            {!isPlaying ? (
              <div
                className="w-100 h-100 position-relative d-flex justify-content-center align-items-center"
                style={{
                  background: "#000",
                }}
              >
                <div
                  className="w-100 h-100 position-relative"
                  style={{
                    backgroundImage: `url(${currentMovie?.primaryImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.7)",
                  }}
                >
                  <div
                    className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center p-4"
                    style={{
                      background: "rgba(0, 0, 0, 0.4)",
                      zIndex: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => currentVideoId ? setIsPlaying(true) : setTrailerError(true)}
                  >
                    <img
                      src={currentMovie?.primaryImage}
                      alt={currentMovie?.originalTitle}
                      className="img-fluid"
                      style={{
                        maxHeight: "60%",
                        maxWidth: "90%",
                        objectFit: "contain",
                        borderRadius: "8px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                      }}
                    />
                    <div
                      className="position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                        zIndex: 3,
                      }}
                    >
                      <h4 className="mb-1">{currentMovie?.originalTitle}</h4>
                      <p className="mb-3" style={{ fontSize: "14px" }}>
                        {currentMovie?.description || "No description available"}
                      </p>
                      <button 
                        className="btn btn-light align-self-start px-4 py-2"
                        disabled={!currentVideoId}
                      >
                        {currentVideoId ? "▶ Play Trailer" : "Trailer Unavailable"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentVideoId && !trailerError ? (
              <div className="h-100 w-100 position-relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&showinfo=0`}
                  title={currentMovie?.originalTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "10px" }}
                  onError={handleTrailerError}
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="position-absolute top-0 end-0 m-3 btn btn-dark rounded-circle"
                  style={{ 
                    zIndex: 3,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="h-100 d-flex flex-column justify-content-center align-items-center p-4">
                <p className="text-center">Trailer not available for this movie</p>
                <button 
                  className="btn btn-outline-light mt-3"
                  onClick={() => setIsPlaying(false)}
                >
                  Go Back
                </button>
              </div>
            )}

            <button
              onClick={handlePrev}
              className="position-absolute top-50 start-0 translate-middle-y btn btn-dark rounded-circle"
              style={{ 
                zIndex: 3, 
                opacity: 0.8,
                width: "40px",
                height: "40px",
              }}
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="position-absolute top-50 end-0 translate-middle-y btn btn-dark rounded-circle"
              style={{ 
                zIndex: 3, 
                opacity: 0.8,
                width: "40px",
                height: "40px",
              }}
            >
              ❯
            </button>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column justify-content-between ps-md-4">
          <h5 className="text-white mb-3">Up Next</h5>
          <div className="overflow-auto" style={{ maxHeight: "540px" }}>
            {getUpNextMovies().map((movie, index) => {
              const hasTrailer = getYouTubeId(movie?.trailer?.url || movie?.trailer);
              return (
                <div
                  key={`${movie?.id}-${index}`}
                  className={`d-flex align-items-center mb-3 p-2 ${index === 0 ? "border border-warning" : "border border-dark"}`}
                  style={{
                    height: "90px",
                    borderRadius: "8px",
                    cursor: hasTrailer ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    opacity: 0.9,
                    backgroundColor: "rgba(30, 30, 30, 0.8)",
                  }}
                  onClick={() => {
                    if (!hasTrailer) return;
                    const newIndex = moviesList.findIndex(m => m.id === movie.id);
                    setCurrentIndex(newIndex % moviesList.length);
                    setIsPlaying(false);
                    setTrailerError(false);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = hasTrailer ? "1" : "0.9"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "0.9"}
                >
                  <img
                    src={movie?.primaryImage}
                    alt={movie?.originalTitle}
                    className="h-100"
                    style={{
                      width: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginRight: "12px",
                      opacity: hasTrailer ? 1 : 0.6,
                    }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <div 
                      className="text-truncate fw-bold" 
                      style={{ fontSize: "14px" }}
                      title={movie?.originalTitle}
                    >
                      {movie?.originalTitle}
                    </div>
                    <small className={hasTrailer ? "text-muted" : "text-danger"}>
                      {hasTrailer ? "Trailer Available" : "No Trailer"}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerCarousel;