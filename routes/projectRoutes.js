const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/projects", createProject);
router.get("/projects/:project_id", getProjectDetail);
router.patch("/projects/:project_id", updateProject);
router.delete("/projects/:project_id", deleteProject);

module.exports = router;
