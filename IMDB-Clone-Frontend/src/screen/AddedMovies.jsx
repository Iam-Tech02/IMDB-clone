import React, { useEffect, useState } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  updateMovie,
  deleteMovie,
} from "../redux/src/ features/AddedMovies";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";

const MovieCarousel = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.addedMovies);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [posterPreview, setPosterPreview] = useState(null);
  const [actorOptions, setActorOptions] = useState([]);
  const [directorOptions, setDirectorOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSelect = (selectedIndex) => setActiveIndex(selectedIndex);

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedActors(movie.actors.map((a) => ({ label: a, value: a })));
    setSelectedDirectors(movie.directors.map((d) => ({ label: d, value: d })));
    setPosterPreview(`http://localhost:5000${movie.poster}`);
    setShowEditModal(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const posterFile = e.target.poster.files[0];

    if (posterFile) {
      formData.append("poster", posterFile);
    }

    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "actors",
      JSON.stringify(selectedActors.map((a) => a.value))
    );
    formData.append(
      "directors",
      JSON.stringify(selectedDirectors.map((d) => d.value))
    );

    try {
      await dispatch(updateMovie({ id: selectedMovie._id, formData }));
      setShowEditModal(false);
      dispatch(fetchMovies());
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPosterPreview(imageUrl);
    }
  };

  const handleDeleteMovie = () => {
    dispatch(deleteMovie(selectedMovie._id)).then(() => {
      setShowDeleteModal(false);
      dispatch(fetchMovies());
    });
  };

  const chunkSize = 4;
  const movieGroups = [];
  for (let i = 0; i < movies.length; i += chunkSize) {
    movieGroups.push(movies.slice(i, i + chunkSize));
  }

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  if (error)
    return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container-fluid mt-3 px-4 justify-content-center">
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        indicators={false}
        interval={null}
      >
        {movieGroups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="d-flex justify-content-center flex-wrap">
              {group.map((movie) => (
                <div
                  key={movie._id}
                  className="mx-2 mb-4"
                  style={{ width: "200px" }}
                >
                  <div
                    className="card h-100 border-0"
                    style={{
                      background: "transparent",
                      transition: "transform 0.3s",
                    }}
                  >
                    <div
                      className="position-relative"
                      style={{
                        height: "280px",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      <img
                        src={`http://localhost:5000${movie.poster}`}
                        alt={movie.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <div
                        className="position-absolute bottom-0 start-0 end-0 p-2"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        }}
                      >
                        <h6
                          className="text-white mb-0"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            textAlign: "center",
                            textShadow: "1px 1px 2px #000",
                          }}
                        >
                          {movie.title}
                        </h6>
                      </div>
                    </div>

                    <div className="card-body p-2 text-center">
                      <div className="d-flex justify-content-center gap-2 mb-2">
                        <button
                          className="btn btn-sm btn-primary p-1 px-2"
                          style={{ fontSize: "0.8rem" }}
                          onClick={(e) => {
                            e.stopPropagation(); // <-- prevent carousel slide
                            handleEditMovie(movie);
                          }}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger p-1 px-2"
                          style={{ fontSize: "0.8rem" }}
                          onClick={(e) => {
                            e.stopPropagation(); // <-- prevent carousel slide
                            handleDeleteClick(movie);
                          }}
                        >
                          <FaTrash className="me-1" /> Delete
                        </button>
                      </div>

                      <div
                        className="d-flex flex-wrap justify-content-center small"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <div className="position-relative">
                          <span
                            key={"Producers"}
                            className="badge bg-secondary m-1"
                          >
                            Actors
                          </span>

                          <div className="hover-actors">
                            <div
                              style={{
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {movie.actors?.map((a, i) => (
                                <span
                                  key={i}
                                  className="badge bg-secondary m-1 d-inline-block"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="position-relative">
                          <span
                            key={"Producers"}
                            className="badge bg-info text-black m-1"
                          >
                            Producers
                          </span>

                          <div className="hover-actors">
                            <div
                              style={{
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {movie.directors?.map((a, i) => (
                                <span
                                  key={i}
                                  className="badge bg-info text-black m-1 d-inline-block"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Edit Movie Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <form onSubmit={handleUpdateMovie}>
              <div className="mb-3">
                <label className="form-label">Movie Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  defaultValue={selectedMovie.title}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  defaultValue={selectedMovie.description}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Current Poster</label>
                <div>
                  <img
                    src={posterPreview}
                    alt="Poster Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <label className="form-label">Change Poster (optional)</label>
                <input
                  type="file"
                  className="form-control"
                  name="poster"
                  accept="image/*"
                  onChange={handlePosterChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Directors</label>
                <CreatableSelect
                  isMulti
                  name="directors"
                  options={directorOptions}
                  value={selectedDirectors}
                  onChange={setSelectedDirectors}
                  placeholder="Select or create directors"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{selectedMovie?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteMovie}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieCarousel;

// <div className="position-relative">
// <span
//   key={"Producers"}
//   className="badge bg-secondary m-1"
// >
//   Actors
// </span>

// <div className="hover-actors">
//   <div
//     style={{
//       overflowX: "auto",
//       whiteSpace: "nowrap",
//     }}
//   >
//     {movie.actors?.map((a, i) => (
//       <span
//         key={i}
//         className="badge bg-secondary m-1 d-inline-block"
//       >
//         {a}
//       </span>
//     ))}
//   </div>
// </div>
// </div>
// <div className="position-relative">
