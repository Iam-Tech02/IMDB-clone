import React, { useState, useEffect } from 'react';
import {
  FaStar,
  FaPlay,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = ({
  title = 'Top Picks',
  movies = [],
  loading = false,
  error = null,
}) => {
  const VISIBLE_CARDS = 6;
  const CARD_WIDTH = 200; 
  const CARD_HEIGHT = 280; 
  const GAP = 16; 
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(movies.length / VISIBLE_CARDS);

  const paginatedMovies = movies.slice(
    currentPage * VISIBLE_CARDS,
    (currentPage + 1) * VISIBLE_CARDS
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [movies]);

  const handleScroll = (dir) => {
    if (dir === 'next' && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (dir === 'prev' && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/title/${id}`);
  };

  const totalWidth = (CARD_WIDTH * VISIBLE_CARDS) + (GAP * (VISIBLE_CARDS - 1));

  return (
    <div className="px-4 mb-5 mx-auto" style={{ maxWidth: '1440px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-warning fw-bold mb-0" style={{ fontSize: '1.75rem' }}>
          {title}
        </h3>
        {totalPages > 1 && (
          <div className="d-flex align-items-center gap-2">
            <span className="text-light">
              {currentPage + 1} / {totalPages}
            </span>
          </div>
        )}
      </div>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}

      <div className="position-relative">
        <div 
          className="d-flex mx-auto" 
          style={{ 
            width: `${totalWidth}px`,
            minHeight: `${CARD_HEIGHT + 100}px`,
            gap: `${GAP}px`
          }}
        >
          {paginatedMovies.map((movie, index) => (
            <div
              key={movie.id || index}
              className="card bg-dark text-white border-0 flex-shrink-0 clickable transition-all"
              style={{
                width: `${CARD_WIDTH}px`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onClick={() => handleCardClick(movie.id)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}
            >
              <div className="position-relative">
                <img
                  src={movie.primaryImage || 'https://via.placeholder.com/200x280?text=No+Image'}
                  alt={movie.primaryTitle}
                  className="card-img-top"
                  style={{
                    height: `${CARD_HEIGHT}px`,
                    objectFit: 'cover',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x280?text=No+Image';
                  }}
                />
                <div className="position-absolute top-0 end-0 m-2 bg-dark bg-opacity-75 rounded-pill px-2 py-1 d-flex align-items-center">
                  <FaStar className="text-warning me-1" size={12} />
                  <small className="text-white">{movie.averageRating || 'N/A'}</small>
                </div>
              </div>
              <div className="card-body p-2">
                <h6 className="card-title mb-2 text-truncate fw-semibold" style={{ fontSize: '0.9rem' }}>
                  {movie.primaryTitle}
                </h6>
                <div className="d-flex justify-content-between mt-2">
                  <button 
                    className="btn btn-sm btn-warning d-flex align-items-center gap-1 px-2"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <FaPlay size={10} />
                    <span>Trailer</span>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-light p-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaInfoCircle size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <>
            <button
              className={`position-absolute top-50 start-0 translate-middle-y bg-dark bg-opacity-75 border-0 text-white p-2 rounded-circle shadow ${currentPage === 0 ? 'opacity-50' : 'hover-bg-warning'}`}
              style={{ 
                zIndex: 10,
                left: '-20px',
                transform: 'translateY(-50%)'
              }}
              onClick={() => handleScroll('prev')}
              disabled={currentPage === 0}
            >
              <FaChevronLeft size={16} />
            </button>

            <button
              className={`position-absolute top-50 end-0 translate-middle-y bg-dark bg-opacity-75 border-0 text-white p-2 rounded-circle shadow ${currentPage === totalPages - 1 ? 'opacity-50' : 'hover-bg-warning'}`}
              style={{ 
                zIndex: 10,
                right: '-20px',
                transform: 'translateY(-50%)'
              }}
              onClick={() => handleScroll('next')}
              disabled={currentPage === totalPages - 1}
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;