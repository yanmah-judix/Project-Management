import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as taskService from "./tasks.service";

// ======================
// Create Task
// ======================
export const create = async (
  req: Request<{ projectId: string }, any, { title: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.createTask(
      new Types.ObjectId(req.params.projectId),
      req.body,
      new Types.ObjectId(req.user!.id)
    );

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// ======================
// Delete Task
// ======================
export const remove = async (
  req: Request<{ taskId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await taskService.deleteTask(
      new Types.ObjectId(req.params.taskId),
      new Types.ObjectId(req.user!.id)
    );

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ======================
// Mark Task Done
// ======================
export const done = async (
  req: Request<{ taskId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.markDone(
      new Types.ObjectId(req.params.taskId),
      new Types.ObjectId(req.user!.id)
    );

    res.json(task);
  } catch (err) {
    next(err);
  }
};