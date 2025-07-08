const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["active", "completed", "archive"],
      default: "active",
    },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
