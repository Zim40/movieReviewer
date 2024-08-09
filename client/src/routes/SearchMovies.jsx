
import { useState, useEffect, Suspense, lazy } from "react";
const Card = lazy(() => import("../Components/Card/card"));
import Spinner from "../Spinner";
import {
  fetchSingleMovie,
  myProfile,
  favoriteMovie,
} from "../Functions/movies";

export default function SearchMovies() {
  const [movie, setMovie] = useState() || null;
  const [otherResults, setOtherResults] = useState([]) || null;
  const [userFavorites, setUserFavorites] = useState([]);
  const [searchParam, setSearchParam] = useState({ movie: "" });
  const [errorMessage, setErrorMessage] = useState() || null;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const fetchUser = await myProfile();

        const favArray = fetchUser?.user.favorites;

        if (!favArray) {
          throw new Error("Error finding favorites!");
        }

        const favoriteIds = favArray.map((fav) => fav.movie_id);
        setUserFavorites(favoriteIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserFavorites();
  }, [setUserFavorites]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!searchParam.movie) {
        setErrorMessage("Search Term Required!");
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
        return;
      }
      const fetchMovie = await fetchSingleMovie(
        encodeURIComponent(searchParam.movie)
      );

      setMovie(fetchMovie.data.results[0]);
      const resultArr = fetchMovie.data.results.splice(1);
      setOtherResults(resultArr);
      setSearchParam({ movie: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleFavorite = async (movieId) => {
    console.log(movieId);
    try {
      const response = await favoriteMovie(movieId);
      
      if (!response.status === 201) {
        console.log("Error with handleToggleFavorite function!");
      } else {
        setUserFavorites((prevState) => [...prevState, movieId.toString()]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      <section className="flex flex-col w-full align-center place-items-center justify-center p-4 ">
        <div className="flex align-center  place-items-center gap-2 flex-row-reverse w-full md:w-1/3">
          <button
            type="submit"
            name="Search bar"
            onClick={handleSubmit}
            className="border border-amber-400 text-amber-400 font-semibold px-2 rounded-full h-8"
          >
            Search
          </button>
          <input
            type="text"
            name="movie"
            value={searchParam.movie}
            onChange={handleInputChange}
            placeholder={errorMessage ? errorMessage : "Search"}
            className={`w-full border rounded-full h-8 border-amber-400 px-6 text-center text-amber-400 ${
              errorMessage ? "placeholder-red-400" : "placeholder-gray-400"
            }`}
          />
        </div>
        {movie && userFavorites?.length >= 0 && (
          <Suspense fallback={<Spinner />}>
            <div className=" flex mt-4 w-full md:w-1/3 border-b border-amber-400">
              <h2 className="text-amber-400 font-bold text-xl font-mono tracking-widest">
                Top Result
              </h2>
            </div>
            <div className="py-4 flex align-center  place-items-center gap-2 flex-row-reverse w-full md:w-1/3 " key={movie.id}>
              <Card
                id={movie?.id}
                title={movie?.title}
                poster_path={movie?.poster_path}
                overview={movie?.overview}
                release_date={movie?.release_date}
                vote_average={movie?.vote_average}
                original_language={movie?.original_language}
                favorites={userFavorites}
                onToggleFavorite={() => handleToggleFavorite(movie.id)}
              />
            </div>
          </Suspense>
        )}
        {movie && otherResults && (
          <div className=" flex mt-4 w-full md:w-1/3 border-b border-amber-400">
            <h2 className="text-amber-400 font-bold text-xl font-mono tracking-widest">
              Other Results
            </h2>
          </div>
        )}

        {otherResults?.map((movie) => (
          
            <div
              className="py-4 flex align-center  place-items-center gap-2 flex-row-reverse w-full md:w-1/3"
              key={movie.id}
            >
              <Card
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                original_language={movie.original_language}
                favorites={userFavorites}
                onToggleFavorite={() => handleToggleFavorite(movie.id)}
              />
            </div>
         
        ))}
      </section>
   
  );
}
