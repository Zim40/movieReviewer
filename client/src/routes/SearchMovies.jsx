import { useState} from "react";


export default function SearchMovies() {
  const [movie, setMovie] = useState({});
  const [searchParam, setSearchParam] = useState({ movie: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search/movie?movie=${encodeURIComponent(searchParam.movie)}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
        },
      })
      const responseData = await response.json();
      
      if(!response.ok) {
        throw new Error("Error fetching movie")
      }
      
      setMovie(responseData.data.results[0]);
      setSearchParam({ movie: "" })
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParam((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <>
      <section className="flex flex-col w-full align-center place-items-center justify-center p-4">
        <div className="flex align-center  place-items-center gap-2 flex-row-reverse w-full ">
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
            placeholder="Search Movies"
            className="w-full border rounded-full h-8 border-amber-400 px-6 text-center"
          />
        </div>

        <div className="m-w-96">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </section>
    </>
  );
}
