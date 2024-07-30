
export async function fetchMovies() {
  try {
    const response = await fetch("/api/movies");
    if (!response.ok) {
      throw new Error("Error fetching data:");
    }
    const movies = await response.json();
    console.log(movies);
    return movies;
  } catch (error) {
    console.error(error);
  }
}

export function formatPercentage(value) {
    return Math.trunc(value)
}

export async function fetchSingleMovie(param) {
  try {
    const response = await fetch(
      `/api/search/movie?movie=${param}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error with Fetch Single Movie Response");
    }
    const singleMovie = await response.json();
    console.log(singleMovie);
    return singleMovie.data.results[0];
  } catch (error) {
    console.error(error);
  }
}
