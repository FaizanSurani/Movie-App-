import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import { movieQueue } from "../queue/movieQueue.js";

dotenv.config();

const imdbIds = JSON.parse(fs.readFileSync("imdbTop250.json"));

const seedMovies = async () => {
  for (const item of imdbIds) {
    const imdbId = item.imdbId;

    const res = await axios.get(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
    );

    if (res.data.Response === "False") {
      console.log(`❌ Skipped ${imdbId}: ${res.data.Error}`);
      continue;
    }

    const movie = {
      title: res.data.Title,
      description: res.data.Plot,
      rating: Number(res.data.imdbRating),
      releaseDate: res.data.Released,
      duration: parseInt(res.data.Runtime),
      poster: res.data.Poster,
    };

    await movieQueue.add("ADD_MOVIE", { movie });

    console.log(`✅ Queued: ${movie.title}`);
  }
};

seedMovies();
