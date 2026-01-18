import Movie from "../models/movieModel.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const movies = await Movie.find({
      $text: { $search: q },
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to search movies",
      error: error.message,
    });
  }
};

export const sortMovies = async (req, res) => {
  try {
    const { by } = req.query;

    const allowedFields = ["title", "rating", "releaseDate", "duration"];

    if (!allowedFields.includes(by)) {
      return res.status(400).json({
        message: "Invalid sort field",
      });
    }

    const movies = await Movie.find().sort({ [by]: -1 });

    return res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to sort movies",
      error: error.message,
    });
  }
};

export const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      rating,
      releaseDate,
      duration,
      poster,
    } = req.body;

    if (!title || !releaseDate) {
      return res.status(400).json({
        message: "Title and release date are required",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      rating,
      releaseDate: new Date(releaseDate),
      duration,
      poster,
    });

    return res.status(201).json({
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Movie already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to add movie",
      error: error.message,
    });
  }
} 

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update movie",
      error: error.message,
    });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};
