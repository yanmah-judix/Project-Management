const taskService = require("./tasks.service");

exports.create = async (req, res, next) => {
  try {
    const task = await taskService.createTask(
      req.params.projectId,
      req.body,
      req.user.id
    );
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.taskId, req.user.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.done = async (req, res, next) => {
  try {
    const task = await taskService.markDone(
      req.params.taskId,
      req.user.id
    );
    res.json(task);
  } catch (err) {
    next(err);
  }
};