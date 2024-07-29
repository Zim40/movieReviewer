import fetch from "node-fetch";

const movieController = {
  async fetchMovies(req, res) {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      res
        .status(200)
        .json({ data: data, message: "Fetch request Successful!" });
    } catch (error) {
      res.status(500).json({ error: error.message,  message: "Internal Server Error" });
    }
  },
  async fetchSingleMovie(req, res) {
    const params  = req.query.movie;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=1`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      res
        .status(200)
        .json({ data: data, message: "Fetch request Successful!" });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({error: error.message, message: 'Internal Server Error'});
    }
  }

};

export default movieController;
