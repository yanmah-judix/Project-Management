import { Types } from "mongoose";
import Project, { IProject } from "./projects.model";

// Create Project
export const create = (data: {
  name: string;
  description?: string;
  user: Types.ObjectId;
}) => {
  return Project.create(data);
};

// Find projects by user
export const findByUser = (userId: Types.ObjectId) => {
  return Project.find({ user: userId });
};

// Find project by id
export const findById = (id: Types.ObjectId) => {
  return Project.findById(id);
};