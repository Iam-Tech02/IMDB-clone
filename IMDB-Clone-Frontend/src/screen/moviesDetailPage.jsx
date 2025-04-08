import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Badge, Button } from "react-bootstrap";
import { FaArrowLeft, FaPlay, FaStar, FaRegClock, FaCalendarAlt, FaGlobe, FaLanguage, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://imdb236.p.rapidapi.com/imdb/${id}`, {
          headers: {
            "x-rapidapi-host": "imdb236.p.rapidapi.com",
            "x-rapidapi-key": "67ef03508bmsh774b26c5ef6182dp1d5fd1jsn4afd79c18273",
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatMoney = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderPersonCard = (person, index) => (
    <div key={index} className="person-card">
      <div className="person-avatar">
        {person.fullName?.charAt(0)}
      </div>
      <div className="person-info">
        <h5>{person.fullName}</h5>
        <p className="role">{person.characters?.join(", ") || person.job}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
        <p>Loading movie magic...</p>
      </div>
    );
  }

  if (!movie) return <div className="error-message">No movie data found.</div>;

  return (
    <div className="movie-details-page">
      {movie.primaryImage && (
        <div className="backdrop-image" style={{ backgroundImage: `url(${movie.primaryImage})` }}></div>
      )}
      
      <Button variant="outline-light" className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </Button>

      <Container className="content-container">
        <Row className="main-content">
          <Col lg={4} className="poster-col">
            <div className="poster-container">
              <img
                src={movie.primaryImage}
                alt={movie.primaryTitle}
                className="movie-poster"
              />
              
              {movie.trailer && (
                <Button 
                  variant="danger" 
                  className="trailer-button"
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPlay className="me-2" /> Watch Trailer
                </Button>
              )}
            </div>
          </Col>

          <Col lg={8} className="details-col">
            <div className="movie-header">
              <h1 className="movie-title">{movie.primaryTitle}</h1>
              <h2 className="movie-original-title">{movie.originalTitle}</h2>
              
              <div className="rating-badges">
                <Badge bg="primary" className="rating-badge">
                  <FaStar className="me-1" /> IMDb: {movie.averageRating}/10
                </Badge>
                <Badge bg="dark" className="rating-badge">
                  {movie.numVotes?.toLocaleString()} votes
                </Badge>
                {movie.metascore && (
                  <Badge bg="success" className="rating-badge">
                    Metascore: {movie.metascore}
                  </Badge>
                )}
              </div>
            </div>

            <div className="movie-description">
              <p>{movie.description}</p>
            </div>

            <div className="movie-meta">
              <div className="meta-item">
                <FaRegClock className="meta-icon" />
                <span>{movie.runtimeMinutes} min</span>
              </div>
              
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{formatDate(movie.releaseDate)}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Type:</span>
                <span>{movie.type}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Rating:</span>
                <span>{movie.contentRating}</span>
              </div>
              
              <div className="meta-item">
                <FaGlobe className="meta-icon" />
                <span>{movie.countriesOfOrigin?.join(", ")}</span>
              </div>
              
              <div className="meta-item">
                <FaLanguage className="meta-icon" />
                <span>{movie.spokenLanguages?.join(", ")}</span>
              </div>
              
              <div className="meta-item genres">
                {movie.genres?.map((genre, index) => (
                  <Badge key={index} bg="secondary" className="genre-badge">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="financial-info">
              <div className="financial-item">
                <FaMoneyBillWave className="financial-icon" />
                <div>
                  <span className="financial-label">Budget</span>
                  <span className="financial-value">{formatMoney(movie.budget)}</span>
                </div>
              </div>
              
              <div className="financial-item">
                <FaMoneyBillWave className="financial-icon" />
                <div>
                  <span className="financial-label">Gross</span>
                  <span className="financial-value">{formatMoney(movie.grossWorldwide)}</span>
                </div>
              </div>
            </div>

            {movie.filmingLocations?.length > 0 && (
              <div className="locations-info">
                <FaMapMarkerAlt className="locations-icon" />
                <div>
                  <span className="locations-label">Filmed in</span>
                  <span className="locations-value">{movie.filmingLocations.join(", ")}</span>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <section className="people-section">
          <h3 className="section-title">Cast</h3>
          <div className="people-grid">
            {movie.cast
              ?.filter(p => p.job === "actor" || p.job === "actress")
              .map((actor, idx) => renderPersonCard(actor, idx))}
          </div>
        </section>

        <section className="people-section">
          <h3 className="section-title">Directors & Writers</h3>
          <div className="people-grid">
            {movie.cast
              ?.filter(p => p.job !== "actor" && p.job !== "actress")
              .map((crew, idx) => renderPersonCard(crew, idx))}
          </div>
        </section>

        {movie.productionCompanies?.length > 0 && (
          <div className="production-info">
            <h4 className="production-title">Production Companies</h4>
            <div className="production-list">
              {movie.productionCompanies.map((company, index) => (
                <Badge key={index} bg="light" text="dark" className="production-badge">
                  {company.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;

