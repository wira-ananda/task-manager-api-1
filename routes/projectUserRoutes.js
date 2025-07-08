const express = require("express");
const router = express.Router();
const { addUserToProject } = require("../controllers/projectUserController");

router.post("/:project_id/users", addUserToProject);

module.exports = router;
