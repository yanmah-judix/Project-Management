const projectRepo = require("./projects.repository");
const Task = require("../tasks/tasks.model");

exports.createProject = async (data, userId) => {
  return projectRepo.create({ ...data, user: userId });
};

exports.getProjects = (userId) => {
  return projectRepo.findByUser(userId);
};

exports.getProjectWithTasks = async (projectId) => {
  const project = await projectRepo.findById(projectId);
  if (!project) throw new Error("Project not found");

  const tasks = await Task.find({ project: projectId });

  return { ...project.toObject(), tasks };
};