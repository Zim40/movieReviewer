import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const moviesSchema = new Schema ({
    _id: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    language: {
        type: String,
    },
    image: {
        type: String,
    },
    
    // timestamp: true,
});

moviesSchema.statics.getMovieCountByUserId = function () {
    return this.countDocuments({ user_id: userId });
}

const Movies = mongoose.model('Movies', moviesSchema);
export default Movies;