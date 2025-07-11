const ProjectUser = require("../models/ProjectUser");
const Project = require("../models/Project");
const User = require("../models/User");

// Tambah user baru
exports.addUserToProject = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const { project_id } = req.params;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User dengan email tersebut tidak ditemukan.",
      });
    }

    // Buat entri ProjectUser dengan user._id
    const newEntry = await ProjectUser.create({
      project_id,
      user_id: user._id,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan ke proyek.",
      data: newEntry,
    });
  } catch (err) {
    next(err);
  }
};

// Ambil semua project dari user
exports.getProjectsByUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const projectUserLinks = await ProjectUser.find({ user_id });

    const projectIds = projectUserLinks.map((link) => link.project_id);

    const projects = await Project.find({ _id: { $in: projectIds } });

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// Ambil semua user dari project tertentu
exports.getProjectUsers = async (req, res) => {
  try {
    const { project_id } = req.params;

    const users = await ProjectUser.find({ project_id })
      .populate("user_id", "username email") // tampilkan hanya username & email
      .sort({ joined_at: 1 }); // opsional: urut berdasarkan waktu join

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};
