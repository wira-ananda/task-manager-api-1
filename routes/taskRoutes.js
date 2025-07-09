const express = require("express");
const router = express.Router();
const {
  addTaskToProject,
  getTasksByProject,
  getTaskDetail,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/projects/:project_id/tasks", addTaskToProject);
router.get("/projects/:project_id/tasks", getTasksByProject);
router.get("/tasks/:task_id", getTaskDetail);
router.patch("/tasks/:task_id", updateTask);
router.delete("/tasks/:task_id", deleteTask);

module.exports = router;
