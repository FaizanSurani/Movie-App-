import express from "express";
import {
  getMovies,
  searchMovies,
  sortMovies,
  addMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movie.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/getMovies", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);

router.post("/addMovie", authenticate, authorize("admin"), addMovie);
router.put("/movie/:id", authenticate, authorize("admin"), updateMovie);
router.delete("/movie/:id", authenticate, authorize("admin"), deleteMovie);

export default router;
