import { Types } from "mongoose";
import Task, { TaskDocument } from "./tasks.model";
import Project from "../projects/projects.model";


export const createTask = async (
  projectId: Types.ObjectId,
  data: { title: string },
  userId: Types.ObjectId
): Promise<TaskDocument> => {
  const project = await Project.findOne({
    _id: projectId,
    user: userId,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return Task.create({
    ...data,
    project: project._id,
  });
};


export const deleteTask = async (
  taskId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<void> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  
  const project = await Project.findOne({
    _id: task.project,
    user: userId,
  });

  if (!project) {
    throw new Error("Unauthorized");
  }

  await task.deleteOne();
};


export const markDone = async (
  taskId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<TaskDocument> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  
  const project = await Project.findOne({
    _id: task.project,
    user: userId,
  });

  if (!project) {
    throw new Error("Unauthorized");
  }

  task.completed = true;

  return task.save();
};