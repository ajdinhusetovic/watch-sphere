import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SourceCard from "../components/SourceCard";
import "../scss/movie-sources.scss";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";

interface Source {
  name: string;
  format: string;
  price?: number;
  web_url: string;
  // Add other properties if necessary
}

const MovieSources = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.watchmode.com/v1/title/${movieId}/sources/?apiKey=${process.env.WATCHMODE_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["source"],
    queryFn: fetchData,
  });

  return (
    <div className="movie-sources-component-wrapper">
      <BackButton location={`/details/${movieId}`} />
      <Logo />
      <div className="movie-sources-wrapper">
        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.isError ? (
          <div>Error: {query.error.message}</div>
        ) : (
          query.data.map((source: Source) => <SourceCard source={source} />)
        )}
      </div>
    </div>
  );
};

export default MovieSources;
