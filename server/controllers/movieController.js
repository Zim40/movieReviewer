import fetch from "node-fetch";
// import Movies from "../models/movies.js";
import User from "../models/user.js";
// import Auth from "../utils/Auth.js";
import mongoose from "mongoose"

const movieController = {
  async fetchMovies(req, res) {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      res
        .status(200)
        .json({ data: data, message: "Fetch request Successful!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message, message: "Internal Server Error" });
    }
  },
  async fetchSingleMovie(req, res) {
    const params = req.query.movie;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      res
        .status(200)
        .json({ data: data, message: "Fetch request Successful!" });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: error.message, message: "Internal Server Error" });
    }
  },

  // send movie id with req body to this endpoint
  async favouriteMovie(req, res) {
    try {
      const userId = req.user._id;
      const movie_id = req.body.movieId;

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error finding movie");
      }
      const movie = await response.json();

      const movieObject = {
        movie_id: movie.id,
        title: movie.title,
        overview: movie.overview,
        original_language: movie.original_language,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      };

      const user = await User.findOne({
        _id: userId,
        "favorites.movie_id": movie.id,
      });

      if (user) {
        return res.status(409).json({ message: "Movie already in favorites!" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { favorites: movieObject },
        },
        { new: true }
      );

      await updatedUser.save();
      return res
        .status(201)
        .json({ message: "Movie saved", data: updatedUser });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: error.message, message: "Internal Server Error" });
    }
  },
};

export default movieController;
