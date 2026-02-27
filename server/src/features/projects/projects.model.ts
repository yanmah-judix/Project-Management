import mongoose, { Schema, Types } from "mongoose";

export interface IProject {
  name: string;
  description?: string;
  user: Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;