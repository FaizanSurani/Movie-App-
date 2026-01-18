import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    rating: { type: Number },
    releaseDate: { type: Date },
    duration: { type: Number },
    poster: { type: String },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text", description: "text" });

export default mongoose.model("Movie", movieSchema);
