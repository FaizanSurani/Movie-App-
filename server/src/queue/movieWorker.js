import { Worker } from "bullmq";
import mongoose from "mongoose";
import Movie from "../models/movieModel.js";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
} catch (error) {
  console.error("❌ MongoDB connection failed", error);
  process.exit(1);
}

new Worker(
  "movieQueue",
  async (job) => {
    try {
      if (job.name !== "ADD_MOVIE") return;

      const { movie } = job.data;

      if (!movie?.title) {
        throw new Error("Invalid movie payload");
      }

      await Movie.findOneAndUpdate({ imdbId: movie.imdbId }, movie, {
        upsert: true,
        new: true,
      });
    } catch (err) {
      console.error("❌ Worker error:", err.message);
      throw err;
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
    concurrency: 5,
  },
);

console.log("🎬 Movie worker running");
