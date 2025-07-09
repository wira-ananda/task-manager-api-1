const Task = require("../models/Task");
const UserProjectProgress = require("../models/UserProjectProgress");
const calculate = require("../utils/calculateProgress");

exports.updateUserProgress = async (project_id, user_id) => {
  const totalTasks = await Task.countDocuments({ project_id, user_id });
  const completedTasks = await Task.countDocuments({
    project_id,
    user_id,
    status: "completed",
  });

  const { progress, perform } = calculate(totalTasks, completedTasks);

  const updated = await UserProjectProgress.findOneAndUpdate(
    { project_id, user_id },
    { progress, perform },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return updated;
};
