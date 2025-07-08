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
