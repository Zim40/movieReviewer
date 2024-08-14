// import User from "../models/user";
import Review from "../models/reviews.js";
// import Movies from "../models/movies";

const reviewController = {
  async postReview(req, res) {
    const userId = req.user._id;
    const reviewData = req.body;
    try {
      const review = { ...reviewData, user: userId };

      if (!review.content || !review.rating) {
        return res
          .status(400)
          .json({ message: "Review Rating and Content required." });
      }
      const content = await Review.create(review);
      if (!content) {
        throw new Error("Error posting review");
      }

      return res.status(201).json({ data: content, message: "Review Posted" });
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res
        .status(500)
        .json({ error: error.message, message: "Internal Server Error" });
    }
  },
};

export default reviewController;
