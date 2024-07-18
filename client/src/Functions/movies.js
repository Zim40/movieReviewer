export default async function fetchMovies () {
  try {
    const response = await fetch("/api/movies");
    if (!response.ok) {
      throw new Error("Error fetching data:");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
  }
}
