import mongoose from "mongoose";
import { info } from "../utils/logger.js";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    info("Connected to Database");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
