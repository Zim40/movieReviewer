import dotenv from "dotenv";
dotenv.config();
import { connect } from "http2";
import mongoose from "mongoose";


const mongoUri = process.env.MONGO_CONNECTION || process.env.CONNECTION;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Successful!")
  } catch (err) {
    console.log("Error starting server connection", err.message);
  }
};
export default connectDb;