
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

export async function fetchSingleMovie() {
  try {
    const response = await fetch("/api/search/movie");
    if (!response.ok) {
      throw new Error("Error with reponse:");
    }
    const singleMovie = await response.json();
    console.log(singleMovie);
    return singleMovie;
  } catch (error) {
    console.error(error);
  }
}
