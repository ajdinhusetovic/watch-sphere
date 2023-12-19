import { useNavigate, useParams } from "react-router-dom";
import "../scss/details.scss";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReadMore from "../components/ReadMore";
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${process.env.WATCHMODE_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["movie"],
    queryFn: fetchData,
  });

  const movieObject = Object.assign({}, query.data);

  // Fetch details or perform actions based on the movieId
  const handleBackClick = () => {
    navigate("/");
  };

  console.log(query.status);
  console.log(movieObject);

  const videoLink = movieObject.trailer;

  const extractVideoID = (url) => {
    if (!url) return null; // Check if URL is undefined or empty
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoID = extractVideoID(videoLink);

  const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : null;

  return (
    <div className="details-wrapper">
      <header>
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft className="icon" style={{ color: "white" }} />
        </button>
      </header>
      <div className="content-wrapper">
        <div className="poster">
          <img src={movieObject.poster} alt="" />
        </div>
        <div className="details">
          <h2 className="movie-title">{movieObject.title}</h2>
          <p className="movie-year">
            {movieObject.year}{" "}
            {movieObject.end_year && <p>- {movieObject.end_year}</p>}
          </p>
          <div className="movie-plot">
            {movieObject.plot_overview && ( // Check if plot_overview exists
              <ReadMore>{movieObject.plot_overview}</ReadMore>
            )}
          </div>
          <div className="available">
            <h3>Where to watch {movieObject.title}?</h3>
            <div className="sources"></div>
          </div>
        </div>
        <div className="trailer-wrapper">
          {embedURL && (
            <div>
              <p>
                Watch the{" "}
                <span id="movie-title-trailer">{movieObject.title}</span>{" "}
                trailer
              </p>
              <iframe
                title="Trailer"
                src={embedURL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
