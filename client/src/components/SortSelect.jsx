import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

const API = import.meta.env.VITE_API_URL;

export default function SortSelect({ setMovies }) {
  const handleSort = async e => {
    const res = await axios.get(
      `${API}/sorted?by=${e.target.value}`
    );
    setMovies(res.data);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Sort By</InputLabel>
      <Select label="Sort By" onChange={handleSort}>
        <MenuItem value="title">Name</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
        <MenuItem value="duration">Duration</MenuItem>
      </Select>
    </FormControl>
  );
}
