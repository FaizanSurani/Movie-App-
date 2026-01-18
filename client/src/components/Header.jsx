import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieForm from "../pages/MovieForm";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight={700}
          component={Link}
          to="/"
          sx={{
            color: "#f5c518",
            textDecoration: "none"
          }}
        >
          Movie App
        </Typography>
        

        <Box sx={{ display: "flex", gap: 2 }}>
          {role === "admin" && (
            <>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#f5c518",
                color: "#000",
                "&:hover": { backgroundColor: "#e6b800" }
              }}
              >
              Add Movie
            </Button>
            <MovieForm open={open} handleClose={() =>setOpen(false)} />
            </>
          )}
          
          <Button color="inherit" component={Link} to="/">
            Movies
          </Button>

          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>

          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/signup"
                sx={{
                  borderColor: "#f5c518",
                  color: "#f5c518"
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
