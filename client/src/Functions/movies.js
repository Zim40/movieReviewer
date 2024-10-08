import Auth from "../utils/Auth";
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
    console.log("Single movie fetch function:", singleMovie)
    return singleMovie;
  } catch (error) {
    console.error(error);
  }
}

export async function myProfile() {
  const user = Auth.loggedIn() ? Auth.getToken() : null;
  try {
    const userProfile = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${user}`
      },
    });
    if(!userProfile.ok) {
      throw new Error("Error finding User Profile")
    }
    const response = await userProfile.json();
    
    return response.data;
  } catch (error) {
    console.error(error);
    
  }
}

export async function favoriteMovie (movieId) {
  const user = Auth.loggedIn() ? Auth.getToken() : null;
  try {
    const response = await fetch("/api/favourite/movie", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${user}`
      },
      body: JSON.stringify({ movieId: movieId})
    })
    
    if(!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message || "Error with response")
      
    }
    const data = await response.json();
    return { status: response.status, data }
  } catch(error) {
    console.error(error)
    
  }
}

