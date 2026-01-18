import { useState } from "react";
import axios from "axios";
import SortSelect from "../components/SortSelect";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import MovieForm from "./MovieForm";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

const ITEMS_PER_PAGE = 8;

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const searchMovies = async () => {
    try {
      setLoading(true);
      setHasSearched(true);
      const res = await axios.get(`${API}/search?q=${query}`);
      setMovies(res.data);
      setPage(1);
    } catch (error) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  const paginatedMovies = movies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Search Movies
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={9} width={"70%"}>
            <TextField
              fullWidth
              placeholder="Search by title or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchMovies()}
            />
          </Grid>

          <Grid item xs={12} md={3} width={"25%"}>
            <SortSelect setMovies={setMovies} />
          </Grid>
        </Grid>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress color="warning" />
        </Box>
      )}

      {!hasSearched && !loading && (
        <Typography align="center" sx={{ mt: 6, color: "text.secondary" }}>
          Start typing to search for a movie by title or description
        </Typography>
      )}

      {hasSearched && !loading && movies.length === 0 && (
        <Typography align="center" sx={{ mt: 6, fontWeight: 600 }}>
          No movies found
        </Typography>
      )}
      {!loading && movies.length > 0 && (
        <Grid container spacing={3}>
          {paginatedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie._id}>
              <MovieCard
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
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && movies.length > 0 && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
        onSuccess={() => {
          searchMovies();
        }}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        movie={selectedMovie}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedMovie(null);
        }}
        onDeleted={() => {
          searchMovies();
        }}
      />
    </Container>
  );
}
