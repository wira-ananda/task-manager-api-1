const ProjectUser = require("../models/ProjectUser");

// Tambah user ke project
exports.addUserToProject = async (req, res) => {
  try {
    const { user_id, role } = req.body;
    const { project_id } = req.params;
    const newEntry = await ProjectUser.create({
      project_id: project_id,
      user_id,
      role,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({
      message: "Gagal menambahkan user ke project",
      error: err.message,
    });
  }
};
