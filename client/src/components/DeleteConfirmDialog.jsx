import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function DeleteConfirmDialog({
  open,
  onClose,
  movie,
  onDeleted,
}) {
  if (!movie) return null;

  const confirmDelete = async () => {
    await axios.delete(`${API}/movie/${movie._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Role: localStorage.getItem("role"),
      },
    });

    onDeleted();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Movie</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <b>{movie.title}</b>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={confirmDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
