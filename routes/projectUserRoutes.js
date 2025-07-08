const express = require("express");
const router = express.Router();
const {
  addUserToProject,
  getProjectsByUser,
} = require("../controllers/projectUserController");

router.post("/projects/:project_id/users", addUserToProject);

router.get("/users/:user_id/projects", getProjectsByUser);

module.exports = router;
