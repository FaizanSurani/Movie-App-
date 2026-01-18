import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/register`, form);
      console.log(response.data);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
      setMessage({
        type: "success",
        text: "Signup successfully",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to signup",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
      }}
    >
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "14px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: "center",
            }}
          >
            Create Account
          </Typography>

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              required
              sx={{ mb: 2 }}
              value={form.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              sx={{ mb: 2 }}
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              sx={{ mb: 3 }}
              value={form.password}
              onChange={handleChange}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#f5c518",
                color: "#121212",
                fontWeight: 700,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#e6b617",
                },
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: "0.9rem",
            }}
          >
            Already have an account?{" "}
            <span
              style={{
                color: "#136CB2",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Link to={"/login"}>
                Login
              </Link>
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
