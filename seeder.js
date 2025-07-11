// seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Load env
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for seeding"))
  .catch((err) => {
    console.error("DB error", err.message);
    process.exit(1);
  });

// Import Models
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const ProjectUser = require("./models/ProjectUser");

const seed = async () => {
  try {
    // Kosongkan dulu
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();
    await ProjectUser.deleteMany();

    // Buat User
    const user1 = new User({
      username: "user",
      email: "user@gmail.com",
      password: "qazwsx", // pakai plain text
    });
    await user1.save();

    // Buat Project
    const project1 = await Project.create({
      name: "Web Landing Page Creative Agency",
      description: "Landing Page dan Profile Creative Agency",
      status: "active",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    });

    // Relasi User ke Project
    await ProjectUser.create({
      user_id: user1._id,
      project_id: project1._id,
      role: "manager",
      joined_at: new Date(),
    });

    // Buat Task
    await Task.create([
      {
        project_id: project1._id,
        user_id: user1._id,
        title: "Setup project frontend",
        description: "Setup folder dan struktur awal project",
        status: "pending",
        priority: "high",
        due_date: "2024-02-01",
      },
      {
        project_id: project1._id,
        user_id: user1._id,
        title: "Buat desain ui/ux",
        description: "Halaman login dengan validasi",
        status: "doing",
        priority: "medium",
        due_date: "2024-02-05",
      },
    ]);

    console.log("✅ Seeding selesai.");
    process.exit();
  } catch (error) {
    console.error("❌ Gagal seeding:", error.message);
    process.exit(1);
  }
};

seed();
