const ProjectUser = require("../models/ProjectUser");
const Project = require("../models/Project");

// Tambah user baru
exports.addUserToProject = async (req, res, next) => {
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
