// import Auth from "../utils/Auth";
import { useState, useEffect, Suspense, lazy } from "react";
const Card = lazy(() => import("../Components/Card/card"));
import Spinner from "../Spinner";
import { fetchSingleMovie, myProfile, favoriteMovie } from "../Functions/movies";

export default function SearchMovies() {
  const [movie, setMovie] = useState() || null;
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
      const fetchMove = await fetchSingleMovie(
        encodeURIComponent(searchParam.movie)
      );
      setMovie(fetchMove);
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

  const handleToggleFavorite = async () => {
    const movieId = movie.id;
    try {
      const response = await favoriteMovie(movieId);
      const result = await response.json();
      if (response.status === 201) {
        setUserFavorites((prevState) => 
          [...prevState, movieId.toString()]
        );
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        <div className="py-4 flex align-center  place-items-center gap-2 flex-row-reverse w-full md:w-1/3">
          {movie && userFavorites?.length > 0 && (
            <Suspense fallback={<Spinner />}>
              <Card
                id={movie?.id}
                title={movie?.title || null}
                poster_path={movie?.poster_path || null}
                overview={movie?.overview || null}
                release_date={movie?.release_date}
                vote_average={movie?.vote_average}
                original_language={movie?.original_language}
                favorites={userFavorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </Suspense>
          )}
        </div>
      </section>
    </>
  );
}
