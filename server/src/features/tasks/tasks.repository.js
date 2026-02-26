const Task = require("./tasks.model");

exports.create = (data) => {
  return Task.create(data);
};

exports.findById = (taskId) => {
  return Task.findById(taskId);
};

exports.findByIdWithProject = (taskId) => {
  return Task.findById(taskId).populate("project");
};

exports.deleteById = (taskId) => {
  return Task.findByIdAndDelete(taskId);
};

exports.update = (taskId, data) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true });
};

exports.findByProject = (projectId) => {
  return Task.find({ project: projectId });
};