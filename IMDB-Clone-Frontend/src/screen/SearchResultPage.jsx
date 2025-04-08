import React from "react";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = ({ suggestions, showSuggestions, setShowSuggestions }) => {
  const navigate = useNavigate();

  const handleClick = (type, id) => {
    setShowSuggestions(false);
    if (type === "movie") {
      navigate(`/title/${id}`);
    } else if (type === "person") {
      navigate(`/person/${id}`);
    }
  };

  if (!showSuggestions || (!suggestions?.titles?.length && !suggestions?.names?.length)) return null;

  return (
    <div
      className="position-absolute bg-white shadow rounded w-100 mt-1 zindex-tooltip overflow-auto"
      style={{ maxHeight: "400px" }}
    >
      {suggestions?.titles?.length > 0 && (
        <div className="px-3 py-2 border-bottom">
          <strong className="text-muted">Movies</strong>
          {suggestions.titles.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center py-2 suggestion-item border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("movie", item.id)}
            >
              <img
                src={item.titlePosterImageModel?.url || "https://via.placeholder.com/40x60"}
                alt={item.titleNameText}
                className="me-2"
                style={{ width: "40px", height: "60px", objectFit: "cover" }}
              />
              <span>{item.titleNameText}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
