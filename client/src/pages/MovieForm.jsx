import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


export default function MovieForm({
  open,
  handleClose,
  mode = "add",
  initialData = null,
  onSuccess,
}) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: "",
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setMovie({
        ...initialData,
        releaseDate: new Date(initialData.releaseDate)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const API = import.meta.env.VITE_API_URL;

  const submit = async (e) => {
    e.preventDefault();

    if (!movie.title || !movie.releaseDate) {
      return setMessage({
        type: "error",
        text: "Title and release date are required",
      });
    }

    try {
      const payload = {
        ...movie,
        releaseDate: new Date(movie.releaseDate),
      };

      if (mode === "add") {
        await axios.post(`${API}/addMovie`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Role: localStorage.getItem("role"),
          },
        });
      } else {
        await axios.put(`${API}/movie/${initialData._id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Role: localStorage.getItem("role"),
          },
        });
      }

      setMessage({
        type: "success",
        text:
          mode === "add"
            ? "Movie added successfully"
            : "Movie updated successfully",
      });

      setMovie({
        title: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
        poster: "",
      });

      onSuccess?.();
      handleClose();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Operation failed",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        🎬 {mode === "add" ? "Add Movie (Admin)" : "Edit Movie"}
      </DialogTitle>

      <DialogContent dividers>
        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Grid container spacing={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={movie.title}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={movie.description}
            onChange={handleChange}
          />

          <TextField
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ step: 0.1 }}
            fullWidth
            value={movie.rating}
            onChange={handleChange}
          />

          <TextField
            label="Release Date"
            name="releaseDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={movie.releaseDate || ""}
            onChange={handleChange}
          />

          <TextField
            label="Duration (min)"
            name="duration"
            type="number"
            fullWidth
            value={movie.duration}
            onChange={handleChange}
          />

          <TextField
            label="Poster URL"
            name="poster"
            fullWidth
            value={movie.poster}
            onChange={handleChange}
          />
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={submit}
          sx={{
            backgroundColor: "#f5c518",
            color: "#121212",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#e6b617" },
          }}
        >
          {mode === "add" ? "Add Movie" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
