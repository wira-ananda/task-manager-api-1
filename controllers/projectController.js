const Project = require("../models/Project");

// Buat project baru
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, status, start_date, end_date } = req.body;
    const newEntry = await Project.create({
      name,
      description,
      status,
      start_date,
      end_date,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    next(err);
  }
};

// Ambil detail project
exports.getProjectDetail = async (req, res) => {
  try {
    const { project_id } = req.params;

    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail project",
      error: err.message,
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      project_id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Project berhasil diperbarui",
      project: updatedProject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal update project",
      error: err.message,
    });
  }
};

// Hapus project
exports.deleteProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    const deleted = await Project.findByIdAndDelete(project_id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal hapus project",
      error: err.message,
    });
  }
};
