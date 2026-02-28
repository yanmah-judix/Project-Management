import { Types } from "mongoose";
import Task, { ITask } from "./tasks.model";


export const create = (
  data: Omit<ITask, "createdAt" | "updatedAt">
): Promise<ITask> => {
  return Task.create(data);
};

export const findById = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findById(taskId);
};


export const findByIdWithProject = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findById(taskId).populate("project");
};

export const deleteById = (
  taskId: Types.ObjectId
): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};


export const update = (
  taskId: Types.ObjectId,
  data: Partial<ITask>
): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(taskId, data, { new: true });
};

export const findByProject = (
  projectId: Types.ObjectId
): Promise<ITask[]> => {
  return Task.find({ project: projectId });
};