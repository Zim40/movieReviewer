import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // timeStamp: {
    //     type: Date,
    //     required: true,
    // },
});

const User = mongoose.model('User', userSchema);
console.log('User Schema created.');

export default User;