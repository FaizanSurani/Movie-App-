import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Pagination, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import MovieForm from "../pages/MovieForm";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

const ITEMS_PER_PAGE = 8;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const loadMovies = async () => {
    const res = await axios.get(`${API}/getMovies`);
    setMovies(res.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  const paginatedMovies = movies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ color: "#f5c518" }}
      >
        Movies List
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {paginatedMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onEdit={(movie) => {
              setSelectedMovie(movie);
              setOpenForm(true);
            }}
            onDelete={(movie) => {
              setSelectedMovie(movie);
              setDeleteOpen(true);
            }}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      <MovieForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
          setSelectedMovie(null);
        }}
        mode="edit"
        initialData={selectedMovie}
        onSuccess={loadMovies}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        movie={selectedMovie}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedMovie(null);
        }}
        onDeleted={loadMovies}
      />
    </Container>
  );
}
