const mongoose = require("mongoose");
const userProgressSchema = new mongoose.Schema({
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
  perform: {
    type: String,
    enum: ["poor", "average", "good", "excelent"],
    required: true,
  },
  progress: { type: Number, min: 0, max: 100 },
});
module.exports = mongoose.model("UserProjectProgress", userProgressSchema);
