import { useState, Suspense, lazy } from "react";
const Card = lazy(() => import("../Components/Card/card"))
import Spinner from "../Spinner";
// import Card from "../Components/Card/card";
import { fetchSingleMovie } from "../Functions/movies";


export default function SearchMovies() {
  const [movie, setMovie] = useState() || null;
  const [searchParam, setSearchParam] = useState({ movie: "" });
  const [errorMessage, setErrorMessage] = useState() || null;



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!searchParam.movie) {
        setErrorMessage("Search Term Required!")
        setTimeout(() => {
          setErrorMessage("")
        }, 1000)
        return
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
      [name]: value
    }));
  }

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
            className={`w-full border rounded-full h-8 border-amber-400 px-6 text-center text-amber-400 ${errorMessage ? "placeholder-red-400" : "placeholder-gray-400"}`}
          />
        </div>
        <div className="py-4 flex align-center  place-items-center gap-2 flex-row-reverse w-full md:w-1/3">
          {
            movie && (
              <Suspense fallback={<Spinner />}>
              <Card
                title={movie?.title || null}
                poster_path={movie?.backdrop_path || null}
                overview={movie?.overview || null}
                release_date={movie?.release_date}
                vote_average={movie?.vote_average}
                original_language={movie?.original_language}
              />
            </Suspense>
            )
          
          }
        </div>
      </section>
    </>
  );
}
