import mongoose, { Schema } from "mongoose";
// import User from "../models/user";

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true,
    maxLength: 256,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Reviews", reviewSchema);

export default Review;
