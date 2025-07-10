const express = require("express");
const router = express.Router();
const {
  addUserToProject,
  getProjectsByUser,
  getProjectUsers,
} = require("../controllers/projectUserController");

router.post("/projects/:project_id/users", addUserToProject);

router.get("/users/:user_id/projects", getProjectsByUser);

router.get("/projects/:project_id/users", getProjectUsers);

module.exports = router;
