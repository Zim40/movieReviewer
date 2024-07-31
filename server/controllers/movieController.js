import fetch from "node-fetch";
// import Movies from "../models/movies.js";
import User from "../models/user.js";
// import Auth from "../utils/Auth.js";
import mongoose from "mongoose"

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
  },

  //Mongo db is interpreting the data as binary instead of different data structures. this is why TypeScript is favoured. TypeSafetyBaby
  async favouriteMovie(req, res) {
    try{
      const userId = req.user._id
      const  movie_id  = 8587;
      const user = await User.findById(userId);
      if(!user) {
        return res.status(409).json({ message: "No user found"})
      }
    if(!user.favorites) {
      user.favorites = []
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      }
    });
    if(!response.ok) {
      throw new Error("Error find movie");
    }
    const movie = await response.json()
console.log(movie)
   
    
      return res.status(200).json({ message: "Movie saved", user });

      
      // const existingMovie = await Movies.findOne({ title: req.body.title});
      // if(!existingMovie) {
      //   const movie = await Movies.create(req.body);
      //   await movie.save();
      //   return res
      //   .status(200)
      //   .json({ data: movie, message: "Movie Saved!" })
      // } else {
      //   return res.status(409).json({ message: "Movie already favourited!"})
      // }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: error.message, message: "Internal Server Error" })
    }
  }

};

export default movieController;
