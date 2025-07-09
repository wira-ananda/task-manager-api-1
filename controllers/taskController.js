const Task = require("../models/Task");
const { updateUserProgress } = require("./userProjectProgressController");

// Tambah task ke project
exports.addTaskToProject = async (req, res) => {
  try {
    const { title, description, status, priority, due_date, user_id } =
      req.body;
    const { project_id } = req.params;

    const newTask = await Task.create({
      project_id,
      user_id,
      title,
      description,
      status,
      priority,
      due_date,
    });

    res.status(201).json({
      success: true,
      message: "Task berhasil ditambahkan ke project",
      task: newTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan task",
      error: err.message,
    });
  }
};

// Ambil semua task berdasarkan project_id
exports.getTasksByProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    const tasks = await Task.find({ project_id }).populate(
      "user_id",
      "username email"
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar task",
      error: err.message,
    });
  }
};

// Ambil detail task berdasarkan task_id
exports.getTaskDetail = async (req, res) => {
  try {
    const { task_id } = req.params;

    const task = await Task.findById(task_id).populate(
      "user_id",
      "username email"
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail task",
      error: err.message,
    });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const updates = req.body;

    // Ambil task sebelum update
    const oldTask = await Task.findById(task_id);
    if (!oldTask) {
      return res.status(404).json({
        success: false,
        message: "Task tidak ditemukan",
      });
    }

    // Update task & populate user_id
    const updatedTask = await Task.findByIdAndUpdate(task_id, updates, {
      new: true,
      runValidators: true,
    }).populate("user_id", "username email");

    // Jika status berubah, update progress user
    if (
      "status" in updates &&
      oldTask.status !== updates.status &&
      updatedTask.user_id
    ) {
      await updateUserProgress(
        updatedTask.project_id,
        updatedTask.user_id._id // ⬅️ harus ID murni
      );
    }

    res.json({
      success: true,
      message: "Task berhasil diperbarui",
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui task",
      error: err.message,
    });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(task_id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Task berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal hapus task",
      error: err.message,
    });
  }
};
