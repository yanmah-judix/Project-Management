import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "./users.repository";
import { IUser } from "./users.model";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const register = async (
  { name, email, password }: RegisterInput
): Promise<IUser> => {

  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return userRepo.createUser({
    name,
    email,
    password: hashed,
  });
};

export const login = async (
  { email, password }: LoginInput
): Promise<string> => {

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET
  );

  return token;
};