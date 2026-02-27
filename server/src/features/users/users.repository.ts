import User, { IUser } from "./users.model";

// Find user by email
export const findByEmail = async (
  email: string
): Promise<IUser | null> => {
  return User.findOne({ email });
};

// Create new user
export const createUser = async (
  data: Partial<IUser>
): Promise<IUser> => {
  return User.create(data);
};

