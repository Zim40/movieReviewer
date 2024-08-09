import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchMovies, formatPercentage } from "../../Functions/movies";

export default function Movies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchMovies();
        setData(movies.data.results);
      } catch (error) {
        setData(error.message);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      {data.map((movie) => (
        <div
          className="flex flex-col m-2 bg-[#0e1018] bg-opacity-60 rounded p-2"
          key={movie.id}
        >
          <img
            className="h-auto max-w-48 sm:max-w-72 overflow-hidden rounded transition-all duration-300  "
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Movie Poster"
          ></img>
          <div>
            <h1 className="text-lg font-bold font-mono">{movie.title}</h1>
            <div>
              <p className="font-semibold">
                <span className="text-amber-400">Released:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="text-amber-400">Rating: </span>
                {formatPercentage(movie.vote_average)}/10
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
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
      vote_average: PropTypes.number,
    })
  ),
};
