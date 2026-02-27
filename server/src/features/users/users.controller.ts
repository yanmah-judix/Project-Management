import { Request, Response, NextFunction } from "express";
import * as userService from "./users.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await userService.login(req.body);

    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};