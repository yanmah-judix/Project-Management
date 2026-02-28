import { Types } from "mongoose";
import Project, { IProject } from "./projects.model";


export const create = (data: {
  name: string;
  description?: string;
  user: Types.ObjectId;
}) => {
  return Project.create(data);
};

export const findByUser = (userId: Types.ObjectId) => {
  return Project.find({ user: userId });
};


export const findById = (id: Types.ObjectId) => {
  return Project.findById(id);
};