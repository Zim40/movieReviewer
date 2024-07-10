import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: [3, 'Must be at least 3 characters, got {VALUE}'],
        max: 100
    },
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
    password: {
        type: String,
        required: true,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Movies',
        index: true,
    }],
    timeStamp: {
        type: Date,
        default: Date.now(), 
    }
});

userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    };
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);
console.log('User Schema created.');

export default User;