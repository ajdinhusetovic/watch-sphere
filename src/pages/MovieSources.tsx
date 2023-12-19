import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    queryKey: ["movie"],
    queryFn: fetchData,
  });
  console.log(query.data);

  return <div className="movie-sources-wrapper"></div>;
};

export default MovieSources;