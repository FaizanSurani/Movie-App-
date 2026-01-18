import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from '../src/routes/movie.routes.js';
import userRoutes from "../src/routes/auth.routes.js";
import connectDB from './config/db.js';
const PORT = 5000;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", movieRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})