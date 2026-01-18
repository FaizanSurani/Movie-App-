import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/login`, form);
      console.log(response.data);

      setForm({
        email: "",
        password: "",
      });

      setMessage({
        type: "success",
        text: "Login successfully",
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to login",
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
            Login
          </Typography>

          <form onSubmit={submit}>
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
              Login
            </Button>
          </form>

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: "0.9rem",
            }}
          >
            Don't have an account?{" "}
            <span
              style={{
                color: "#136CB2",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Link to={"/signup"}>Signup</Link>
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
