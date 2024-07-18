import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import fetchMovies from "../../Functions/movies";

export default function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchMovies();
        setData(movies.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex gap-2">
      {data.map((movie) => (
        <div className="flex border" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.original_language}</p>
          <p>{movie.overview}</p>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

Movies.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      original_language: PropTypes.string.isRequired,
      overview: PropTypes.string,
      release_date: PropTypes.string.isRequired,
    })
  ),
};
