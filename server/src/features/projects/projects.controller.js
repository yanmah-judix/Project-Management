const projectService = require("./projects.service");

exports.create = async (req, res, next) => {
  try {
    const project = await projectService.createProject(
      req.body,
      req.user.id
    );
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const data = await projectService.getProjectWithTasks(
      req.params.projectId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};