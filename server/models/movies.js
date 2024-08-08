import { Schema } from "mongoose";
import mongoose from "mongoose";

const moviesSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  original_language: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: String,
    required: true,
  },

  // timestamp: true,
}, {_id: false});

moviesSchema.statics.getMovieCountByUserId = function () {
  return this.countDocuments({ user_id: userId });
};

// const Movies = mongoose.model("Movies", moviesSchema);
export default moviesSchema;
