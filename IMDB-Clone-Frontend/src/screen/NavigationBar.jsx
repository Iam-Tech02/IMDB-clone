import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import {
  Navbar,
  Container,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  clearSearchResults,
} from "../redux/src/ features/searchSlice";
import { addMovie, fetchMovies } from "../redux/src/ features/AddedMovies";

const NavigationBar = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);

  const [actorOptions, setActorOptions] = useState([
    { value: "Robert Downey Jr.", label: "Robert Downey Jr." },
    { value: "Scarlett Johansson", label: "Scarlett Johansson" },
    { value: "Chris Evans", label: "Chris Evans" },
    { value: "Tom Holland", label: "Tom Holland" },
  ]);

  const [directorOptions, setDirectorOptions] = useState([
    { value: "Christopher Nolan", label: "Christopher Nolan" },
    { value: "Steven Spielberg", label: "Steven Spielberg" },
    { value: "Quentin Tarantino", label: "Quentin Tarantino" },
    { value: "James Cameron", label: "James Cameron" },
  ]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results } = useSelector((state) => state.search);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchSearchResults(query));
      } else {
        dispatch(clearSearchResults());
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, dispatch]);

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    dispatch(clearSearchResults());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSuggestionClick = (type, id) => {
    navigate(type === "title" ? `/title/${id}` : `/person/${id}`);
    dispatch(clearSearchResults());
    setQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // const loading = useSelector((state) => state.addedMovies.loading);
  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const actorNames = selectedActors.map((a) => a.value);
    const directorNames = selectedDirectors.map((d) => d.value);

    formData.append("actors", JSON.stringify(actorNames));
    formData.append("directors", JSON.stringify(directorNames));

    try {
      await dispatch(addMovie(formData)).unwrap();
      await dispatch(fetchMovies());
      setShowModal(false);
      setSelectedActors([]);
      setSelectedDirectors([]);
    } catch (err) {
      console.error("Movie submission failed:", err);
    } finally {
      setLoading(false); // move this here to always reset loading
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        className="shadow-sm py-3"
        style={{ backgroundColor: "#000" }}
      >
        <Container
          fluid
          className="px-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
        >
          <Navbar.Brand as={Link} to="/" className="p-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb Logo"
              width="60"
              height="30"
            />
          </Navbar.Brand>

          <div
            className="position-relative flex-grow-1"
            style={{ maxWidth: "600px" }}
          >
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search IMDb"
                className="shadow-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  height: "38px",
                  backgroundColor: "#fff",
                  color: "#000",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                }}
              />
              <Button
                variant="warning"
                onClick={handleSearch}
                style={{
                  width: "45px",
                  height: "38px",
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                  backgroundColor: "#f5c518",
                  color: "#000",
                }}
              >
                <Search size={18} />
              </Button>
            </InputGroup>

            {query &&
              (results?.titleResults?.results?.length > 0 ||
                results?.nameResults?.results?.length > 0) && (
                <div
                  className="position-absolute w-100 bg-white shadow z-3 mt-1 rounded"
                  style={{
                    top: "100%",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 9999,
                  }}
                >
                  {results?.titleResults?.results?.length > 0 && (
                    <>
                      <div className="fw-bold px-3 pt-2 text-muted small">
                        Movies
                      </div>
                      {results.titleResults.results.map((item) => (
                        <ListGroup.Item
                          key={item.id}
                          action
                          onClick={() =>
                            handleSuggestionClick("title", item.id)
                          }
                          className="d-flex align-items-center gap-3 py-2 px-3"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={
                              item.titlePosterImageModel?.url ||
                              "https://via.placeholder.com/40x60"
                            }
                            alt={item.titleNameText}
                            width={40}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                          />
                          <span className="fw-semibold">
                            {item.titleNameText}
                          </span>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}

                  {results?.nameResults?.results?.length > 0 && (
                    <>
                      <div className="fw-bold px-3 pt-3 text-muted small">
                        Actors
                      </div>
                      {results.nameResults.results.map((person) => (
                        <ListGroup.Item
                          key={person.id}
                          action
                          onClick={() =>
                            handleSuggestionClick("name", person.id)
                          }
                          className="d-flex align-items-center gap-3 py-2 px-3"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={
                              person.avatarImageModel?.url ||
                              "https://via.placeholder.com/40x40"
                            }
                            alt={person.displayNameText}
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                          />
                          <span className="fw-semibold">
                            {person.displayNameText}
                          </span>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </div>
              )}
          </div>

          <Button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "#f5eceb",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              padding: "6px 14px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              e.currentTarget.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/13045/13045428.png"
              height={"30px"}
              alt="Add Movie"
            />
          </Button>

          <Button
            onClick={handleLogout}
            style={{
              backgroundColor: "#f5c518",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              padding: "6px 14px",
              borderRadius: "6px",
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleMovieSubmit}>
            <Form.Group className="mb-3" controlId="movieTitle">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter movie name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="moviePoster">
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control
                name="poster"
                type="file"
                accept="image/*"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="movieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                placeholder="Write a short description..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="movieActors">
              <Form.Label>Actors</Form.Label>
              <CreatableSelect
                isMulti
                options={actorOptions}
                value={selectedActors}
                onChange={setSelectedActors}
                placeholder="Select or add actors..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="movieDirectors">
              <Form.Label>Producers</Form.Label>
              <CreatableSelect
                isMulti
                options={directorOptions}
                value={selectedDirectors}
                onChange={setSelectedDirectors}
                placeholder="Select or add directors..."
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;
