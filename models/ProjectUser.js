const mongoose = require("mongoose");

const projectUserSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: { type: String, enum: ["manager", "developer"], required: true },
  joined_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProjectUser", projectUserSchema);
