const Task = require("./tasks.model");
const Project = require("../projects/projects.model");

exports.createTask = async (projectId, data, userId) => {
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) throw new Error("Project not found");

  return Task.create({ ...data, project: project._id });
};

exports.deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("project");
  if (!task) throw new Error("Task not found");

  if (task.project.user.toString() !== userId)
    throw new Error("Unauthorized");

  await task.deleteOne();
};

exports.markDone = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("project");
  if (!task) throw new Error("Task not found");

  if (task.project.user.toString() !== userId)
    throw new Error("Unauthorized");

  task.completed = true;
  return task.save();
};