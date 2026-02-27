import { Types } from "mongoose";
import * as projectRepo from "./projects.repository";
import Task from "../tasks/tasks.model";
import { IProject } from "./projects.model";
import { ITask } from "../tasks/tasks.model";

// Create Project
export const createProject = async (
  data: { name: string; description?: string },
  userId: Types.ObjectId
): Promise<IProject> => {
  return projectRepo.create({ ...data, user: userId });
};

// Get All Projects of User
export const getProjects = (
  userId: Types.ObjectId
): Promise<IProject[]> => {
  return projectRepo.findByUser(userId);
};

// Get Project with Tasks
export const getProjectWithTasks = async (
  projectId: Types.ObjectId
): Promise<(IProject & { tasks: ITask[] })> => {
  const project = await projectRepo.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const tasks = await Task.find({ project: projectId });

  return {
    ...project.toObject(),
    tasks,
  };
};