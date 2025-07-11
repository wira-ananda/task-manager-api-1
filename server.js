// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config(); // Load .env
connectDB(); // Panggil koneksi database

const app = express();

// cors
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Routes
const protect = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectUserRoutes = require("./routes/projectUserRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", protect, userRoutes);
app.use("/api", protect, projectRoutes);
app.use("/api", protect, projectUserRoutes);
app.use("/api", protect, taskRoutes);

// Middleware error
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
