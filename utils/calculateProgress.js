// utils/calculateProgress.js
function calculateProgressAndPerform(totalTasks, completedTasks) {
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let perform = "poor";
  if (progress >= 80) perform = "excelent";
  else if (progress >= 60) perform = "good";
  else if (progress >= 40) perform = "average";

  return { progress, perform };
}

module.exports = calculateProgressAndPerform;
