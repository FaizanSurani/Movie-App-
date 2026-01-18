import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const role = localStorage.getItem("role");

  return (
    <Card sx={{ display: "flex", gap: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 110, height:120, borderRadius: 1 }}
        image={movie.poster || "/no-poster.png"}
        alt={movie.title}
      />

      <Box sx={{ flex: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography fontWeight={700}>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(movie.releaseDate).getFullYear()} • {movie.rating}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {movie.description?.slice(0, 120)}...
          </Typography>
        </CardContent>

        {role === "admin" && (
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(movie)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(movie)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}
