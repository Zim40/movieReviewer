import dotenv from "dotenv";
dotenv.config();
import { connect } from "http2";
import mongoose from "mongoose";

const url = process.env.CONNECTION;
const productionUrl = process.env.MONGO_CONNECTION


const connectDb = async () => {
  try {
    await mongoose.connect(url || productionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Successful!")
  } catch (err) {
    console.log("Error starting server connection", err.message);
  }
};
export default connectDb;