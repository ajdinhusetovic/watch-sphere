import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "../scss/search.scss";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleMovieCardClick = (movieId: string) => {
    navigate(`/details/${movieId}`);
  };

  const query = useQuery({
    queryKey: ["movie", inputValue],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.WATCHMODE_API_KEY}&search_value=${inputValue}&search_type=1`
        );
        setSuggestions(response.data.results);
        console.log(response.headers);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="movie-input"
      />
      {suggestions.length > 0 ? (
        <div className="movie-list-wrapper">
          {suggestions.map((movie, index) => (
            <div key={index} onClick={() => handleMovieCardClick(movie.id)}>
              <div className="movie-card-wrapper">
                <div className="image-wrapper">
                  <img src={movie.image_url} alt="" width={50} height={50} />
                </div>

                <div className="title-wrapper">
                  <p>{movie.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Search;
