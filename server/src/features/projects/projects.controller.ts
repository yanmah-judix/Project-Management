import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as projectService from "./projects.service";


export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await projectService.createProject(
      req.body,
      new Types.ObjectId(req.user!.id)
    );

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// Get All Projects
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await projectService.getProjects(
      new Types.ObjectId(req.user!.id)
    );

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// Get One Project with Tasks
export const getOne = async (
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await projectService.getProjectWithTasks(
      new Types.ObjectId(req.params.projectId)
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
};