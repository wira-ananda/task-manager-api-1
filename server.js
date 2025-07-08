const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Konfigurasi environment variable
dotenv.config();

// Inisialisasi express app
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Route Utama
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectUserRoutes = require("./routes/projectUserRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", projectUserRoutes);

// Middleware error
app.use(errorMiddleware);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
