import { Types } from "mongoose";
import Task, { ITask } from "./tasks.model";

// Create Task
export const create = (
  data: Omit<ITask, "createdAt" | "updatedAt">
): Promise<ITask> => {
  return Task.create(data);
};

// Find By Id
export const findById = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findById(taskId);
};

// Find By Id With Project Populated
export const findByIdWithProject = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findById(taskId).populate("project");
};

// Delete By Id
export const deleteById = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};

// Update Task
export const update = (
  taskId: Types.ObjectId,
  data: Partial<ITask>
): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(taskId, data, { new: true });
};

// Find Tasks By Project
export const findByProject = (
  projectId: Types.ObjectId
): Promise<ITask[]> => {
  return Task.find({ project: projectId });
};