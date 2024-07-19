import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import fetchMovies from "../../Functions/movies";
import { fetchMovies } from "../../Functions/movies";

export default function Movies() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

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



  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  console.log(data);
  return (
    <>
      {data.map((movie) => (
        <div className="flex flex-col m-2 bg-[#0e1018] bg-opacity-60 rounded p-2" key={movie.id}>
          <img
            className="h-auto max-w-48 sm:max-w-96 overflow-hidden rounded transition-all duration-300  "
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Movie Poster"
          ></img>
          <div>
            <h1 className="text-lg font-bold font-mono">{movie.title}</h1>
            <div>
              <p className="font-semibold">Released: {movie.release_date}</p>
              <p>{movie.original_language}</p>
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
    })
  ),
};
